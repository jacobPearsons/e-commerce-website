export default function ContentSection(){
    return (
        <section className="py-32">
            <div className="mx-auto max-w-5xl space-y-12 px-6">
                <img className="rounded-card grayscale" src="https://images.unsplash.com/photo-1530099486328-e021101a494a?q=80&w=2747&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="team image" height="" width="" loading="lazy" />

                <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                    <h2 className="text-title text-4xl font-medium">The Gemini ecosystem brings together our models, products and platforms.</h2>
                    <div className="space-y-6">
                        <p className="text-body">Gemini is evolving to be more than just the models. It supports an entire ecosystem — from products to the APIs and platforms helping developers and businesses innovate.</p>
                        <a href="#" className="btn variant-soft sz-md w-fit">
                            <span>Learn More</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}