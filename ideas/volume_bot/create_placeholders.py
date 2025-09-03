from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder_image(text, output_path, size=(800, 400), bg_color=(41, 41, 41), text_color=(255, 255, 255)):
    """Create a placeholder image with text."""
    # Create image with background
    image = Image.new('RGB', size, bg_color)
    draw = ImageDraw.Draw(image)
    
    # Try to load a font, fall back to default if not available
    try:
        font = ImageFont.truetype("arial.ttf", 40)
    except:
        font = ImageFont.load_default()
    
    # Calculate text position for center alignment
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    x = (size[0] - text_width) // 2
    y = (size[1] - text_height) // 2
    
    # Draw text
    draw.text((x, y), text, font=font, fill=text_color)
    
    # Save image
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    image.save(output_path)

def main():
    # Create placeholder images for each step
    placeholders = {
        'media/start/welcome.jpg': 'Wanna push your chart higher?',
        'media/token/token_input.jpg': 'Enter Token Address',
        'media/telegram/telegram_input.jpg': 'Enter Telegram Link',
        'media/logo/logo_input.jpg': 'Send Logo or Banner',
        'media/packages/packages.jpg': 'Select Package',
        'media/payment/payment.jpg': 'Payment Details'
    }
    
    for path, text in placeholders.items():
        create_placeholder_image(text, path)
        print(f"Created placeholder image: {path}")

if __name__ == '__main__':
    main() 