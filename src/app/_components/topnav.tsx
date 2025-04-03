const TopNav = () => {
    return (
        <div className="lg:hidden bg-white/50 dark:bg-black/60 sticky top-0 z-20 backdrop-blur-[20px]">
            <details className="border-b border-border-muted dark:border-border border-opacity-20">
                <summary className="p-4 flex gap-2 items-center justify-between">
                    <div className="flex-1 flex gap-2 items-center text-xl md:text-2xl">
                        {/* Replace with SVG */}
                        <div className="text-text dark:text-text-inverted">
                            Hello
                        </div>
                        <div className="text-text dark:text-text-inverted">
                            World
                        </div>
                    </div>
                </summary>
            </details>
        </div>
    )
}

export default TopNav;
