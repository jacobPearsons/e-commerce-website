import Link from 'next/link';

export default function ContentSection(){
    return (
        <section class="py-32">
            <div class="mx-auto max-w-5xl px-6">
                <div class="grid gap-6 md:grid-cols-2 md:gap-12">
                    <h2 class="text-title text-4xl font-medium">The Gemini ecosystem brings together our models, products and platforms.</h2>
                    <div class="space-y-6">
                        <p class="text-body">Gemini is evolving to be more than just the models. It supports an entire ecosystem — from products to the APIs and platforms helping developers and businesses innovate.</p>
                        <p class="text-body">Tailus UI. <span class="text-title font-medium">It supports an entire ecosystem</span> — from products innovate. Sit minus, quod debitis autem quia aspernatur delectus impedit modi, neque non id ad dignissimos? Saepe deleniti perferendis beatae.</p>
                        <Link href="#" class="btn variant-soft sz-md w-fit">
                            <span>Learn More</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}