export default function ContentSection(){
    return (
        <section className="overflow-hidden py-32">
            <div className="mx-auto max-w-5xl space-y-16 px-6">
                <h2 className="text-title relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">The Gemini ecosystem brings together our models.</h2>
                <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
                    <div className="relative z-10 space-y-4">
                        <p className="text-body">Gemini is evolving to be more than just the models. <span className="text-title font-medium">It supports an entire ecosystem</span> — from products innovate.</p>
                        <p>It supports an entire ecosystem — from products to the APIs and platforms helping developers and businesses innovate</p>

                        <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clip-rule="evenodd"></path>
                                    </svg>
                                    <h3 className="text-title text-sm font-medium">Faaast</h3>
                                </div>
                                <p className="text-body text-sm">It supports an entire helping developers and innovate.</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16.5 7.5h-9v9h9v-9Z"></path>
                                        <path
                                            fillRule="evenodd"
                                            d="M8.25 2.25A.75.75 0 0 1 9 3v.75h2.25V3a.75.75 0 0 1 1.5 0v.75H15V3a.75.75 0 0 1 1.5 0v.75h.75a3 3 0 0 1 3 3v.75H21A.75.75 0 0 1 21 9h-.75v2.25H21a.75.75 0 0 1 0 1.5h-.75V15H21a.75.75 0 0 1 0 1.5h-.75v.75a3 3 0 0 1-3 3h-.75V21a.75.75 0 0 1-1.5 0v-.75h-2.25V21a.75.75 0 0 1-1.5 0v-.75H9V21a.75.75 0 0 1-1.5 0v-.75h-.75a3 3 0 0 1-3-3v-.75H3A.75.75 0 0 1 3 15h.75v-2.25H3a.75.75 0 0 1 0-1.5h.75V9H3a.75.75 0 0 1 0-1.5h.75v-.75a3 3 0 0 1 3-3h.75V3a.75.75 0 0 1 .75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h10.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V6.75Z"
                                            clipRule="evenodd"></path>
                                    </svg>
                                    <h3 className="text-title text-sm font-medium">Powerful</h3>
                                </div>
                                <p className="text-body text-sm">It supports an entire helping developers and businesses.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative mt-6 sm:mt-0">
                        <div className="absolute -inset-20 bg-[linear-gradient(to_right,var(--ui-border-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--ui-border-color)_1px,transparent_1px)] bg-[size:24px_24px] sm:-inset-40"></div>
                        <div className="absolute -inset-20 bg-gradient-to-b from-gray-50 via-transparent to-gray-50 sm:-inset-40 dark:from-gray-950 dark:via-transparent dark:to-gray-950"></div>
                        <div className="absolute -inset-20 bg-gradient-to-r from-gray-50 via-transparent to-gray-50 sm:-inset-40 dark:from-gray-950 dark:via-transparent dark:to-gray-950"></div>
                        <div className="tls-shadow-md rounded-card relative overflow-hidden shadow-gray-950/[0.03]">
                            <img className="relative dark:hidden" src="/blocks/traf.png" alt="" />
                            <img className="relative hidden grayscale dark:block" src="/blocks/traf-dark.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}