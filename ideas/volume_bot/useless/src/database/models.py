from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
from src.config.settings import DATABASE_URL

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    telegram_id = Column(Integer, unique=True)
    username = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    payments = relationship("Payment", back_populates="user")
    tracking = relationship("TokenTracking", back_populates="user")

class Payment(Base):
    __tablename__ = 'payments'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    package_id = Column(String)
    amount = Column(Float)
    status = Column(String)  # pending, confirmed, rejected
    media_id = Column(String)  # For payment proof
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="payments")

class TokenTracking(Base):
    __tablename__ = 'token_tracking'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    contract_address = Column(String)
    last_price = Column(Float)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="tracking")

class Database:
    def __init__(self):
        self.engine = create_engine(DATABASE_URL)
        Base.metadata.create_all(self.engine)
        Session = sessionmaker(bind=self.engine)
        self.session = Session()
    
    def get_or_create_user(self, telegram_id, username=None):
        user = self.session.query(User).filter_by(telegram_id=telegram_id).first()
        if not user:
            user = User(telegram_id=telegram_id, username=username)
            self.session.add(user)
            self.session.commit()
        return user
    
    def add_payment(self, telegram_id, package_id):
        try:
            user = self.get_or_create_user(telegram_id)
            package = VOLUME_PACKAGES.get(package_id)
            if not package:
                return False
            
            payment = Payment(
                user_id=user.id,
                package_id=package_id,
                amount=package['price'],
                status='pending'
            )
            self.session.add(payment)
            self.session.commit()
            return True
        except Exception as e:
            self.session.rollback()
            logger.error(f"Error adding payment: {e}")
            return False
    
    def update_payment_status(self, telegram_id, status, media_id=None):
        try:
            user = self.get_or_create_user(telegram_id)
            payment = self.session.query(Payment).filter_by(
                user_id=user.id,
                status='pending'
            ).first()
            
            if not payment:
                return False
            
            payment.status = status
            if media_id:
                payment.media_id = media_id
            self.session.commit()
            return True
        except Exception as e:
            self.session.rollback()
            logger.error(f"Error updating payment status: {e}")
            return False
    
    def get_pending_payments(self):
        return self.session.query(Payment).filter_by(status='awaiting review').all()
    
    def add_tracking(self, telegram_id, contract_address, initial_price):
        try:
            user = self.get_or_create_user(telegram_id)
            tracking = TokenTracking(
                user_id=user.id,
                contract_address=contract_address,
                last_price=initial_price
            )
            self.session.add(tracking)
            self.session.commit()
            return True
        except Exception as e:
            self.session.rollback()
            logger.error(f"Error adding tracking: {e}")
            return False
    
    def update_price(self, contract_address, new_price):
        try:
            tracking = self.session.query(TokenTracking).filter_by(
                contract_address=contract_address,
                is_active=True
            ).first()
            
            if tracking:
                tracking.last_price = new_price
                self.session.commit()
                return True
            return False
        except Exception as e:
            self.session.rollback()
            logger.error(f"Error updating price: {e}")
            return False
    
    def get_all_tracking(self):
        return self.session.query(TokenTracking).filter_by(is_active=True).all()
