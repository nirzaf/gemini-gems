// Client-side script to fetch and display gem statistics and labels
async function loadGemData() {
    try {
        // Fetch all gem stats
        const base = (import.meta as any)?.env?.BASE_URL || '/';
        const statsResponse = await fetch(`${base}api/copy`);
        const statsData = await statsResponse.json();

        // Fetch all labels
        const labelsResponse = await fetch(`${base}api/labels`);
        const labelsData = await labelsResponse.json();

        if (!statsData.success || !labelsData.success) {
            console.warn('Failed to fetch gem data');
            return;
        }

        const gemStats: Record<string, any> = {};
        if (Array.isArray(statsData.stats)) {
            statsData.stats.forEach((stat: any) => {
                gemStats[stat.gem_slug] = stat;
            });
        }

        // Update each gem card with stats and labels
        const cards = document.querySelectorAll('.gem-card');



        for (const card of cards) {
            const gemSlug = (card as HTMLElement).dataset.gemSlug;
            if (!gemSlug) continue;

            // Add copy count badge (show 0 if no stats)
            const stats = gemStats[gemSlug];
            const copyCount = stats?.copy_count || 0;

            // Check if badge already exists
            if (!card.querySelector('.copy-count-badge')) {
                const copyBadge = document.createElement('div');
                copyBadge.className = 'copy-count-badge absolute -top-2 -right-2 inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-full bg-white dark:bg-[#0f1419] text-orange-500 border border-orange-200 dark:border-orange-500/30 shadow-sm z-10';
                copyBadge.title = `Copied ${copyCount} times`;
                copyBadge.innerHTML = `
            <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            ${copyCount}
          `;
                card.appendChild(copyBadge);
            }

            // Fetch and add labels for this gem
            try {
                const gemLabelsResponse = await fetch(`${base}api/gem-labels?gemSlug=${gemSlug}`);
                const gemLabelsData = await gemLabelsResponse.json();

                if (gemLabelsData.success && gemLabelsData.labels && gemLabelsData.labels.length > 0) {
                    const categoryBadgeContainer = card.querySelector('.mb-3.flex.items-center.gap-2.flex-wrap');
                    if (categoryBadgeContainer) {
                        // Add up to 2 labels
                        gemLabelsData.labels.slice(0, 2).forEach((label: any) => {
                            const labelBadge = document.createElement('span');
                            labelBadge.className = 'inline-block px-2 py-0.5 text-xs font-semibold rounded text-white border';
                            labelBadge.style.backgroundColor = `${label.color}20`;
                            labelBadge.style.borderColor = `${label.color}50`;
                            labelBadge.textContent = label.name;
                            categoryBadgeContainer.appendChild(labelBadge);
                        });
                    }
                }
            } catch (error) {
                console.warn(`Failed to fetch labels for ${gemSlug}:`, error);
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
