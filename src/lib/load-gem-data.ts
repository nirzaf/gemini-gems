// Client-side script to fetch and display gem statistics and labels
async function loadGemData() {
    try {
        // Fetch all gem stats
        const base = (import.meta as any)?.env?.BASE_URL || '/';
        const cleanBase = base.replace(/\/$/, "");

        const response = await fetch(`${cleanBase}/api/stats`);
        if (!response.ok) throw new Error('Failed to fetch stats');

        const data = await response.json();
        if (!data.success || !data.stats) return;

        const gemStats: Record<string, any> = {};
        if (Array.isArray(data.stats)) {
            data.stats.forEach((stat: any) => {
                gemStats[stat.gemSlug] = stat; // Note: Drizzle returns camelCase keys by default unless configured otherwise, checking schema
            });
        }

        // Update each gem card with stats and labels
        const cards = document.querySelectorAll('.gem-card');

        for (const card of cards) {
            const el = card as HTMLElement;
            const gemSlug = el.dataset.gemSlug;
            if (!gemSlug) continue;

            // Add copy count badge (show 0 if no stats)
            const stats = gemStats[gemSlug];
            const copyCount = stats?.copyCount || 0;

            // Find the category badge container to append next to it
            // The structure in GemCard is: <div class="mb-3 flex items-center gap-2 flex-wrap"> ... badge ... </div>
            const badgeContainer = el.querySelector('.mb-3.flex.items-center.gap-2.flex-wrap');

            // Check if badge already exists
            if (badgeContainer && !el.querySelector('.copy-count-badge')) {
                const copyBadge = document.createElement('span');
                // Styling to match MuiSearchFilter expectations: .bg-orange-500/20
                copyBadge.className = 'copy-count-badge inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-md bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30';
                copyBadge.title = `Copied ${copyCount} times`;
                copyBadge.innerHTML = `
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 01-2-2V5a2 2 0 012-2h4"></path></svg>
                    ${copyCount}
                `;
                badgeContainer.appendChild(copyBadge);
            }
        }
    } catch (error) {
        console.error('Failed to load gem data:', error);
    }
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGemData);
} else {
    loadGemData();
}

// Also run after Astro page transitions
document.addEventListener('astro:page-load', loadGemData);
