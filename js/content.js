
document.addEventListener('DOMContentLoaded', function() {

    const featureRoadmap = document.querySelector('.roadmap');

    const defaultIcon = "lightbulb";

    function buildFeatureRoadMapItem(heading, description, tags, step, icon = defaultIcon) {

        const roadmapItem = document.createElement('div');
        roadmapItem.classList.add("roadmap-item");

        // Content
        const roadmapItemContent = document.createElement('div');
        roadmapItemContent.classList.add("roadmap-card");

        /* const roadmapItemIcon = document.createElement('div');
        roadmapItemIcon.classList.add("roadmap-feature-icon");
        roadmapItemIcon.ariaHidden = true; */
        // roadmapItemIcon.innerHTML += `<i class="fas fa-${icon || defaultIcon}"></i>`;

        const roadmapItemHeading = document.createElement('h3');
        roadmapItemHeading.textContent = heading;

        const roadmapItemDescription = document.createElement('p');
        roadmapItemDescription.textContent = description;

        const roadmapItemTag = document.createElement('span');
        roadmapItemTag.classList.add("feature-tags", "roadmap-tag", "primary"); // ← add "primary" for styling
        roadmapItemTag.textContent = tags.join(', ');

        // Node — sibling of content, NOT inside it
        const roadmapItemNode = document.createElement('div');
        roadmapItemNode.classList.add("roadmap-node");
        roadmapItemNode.ariaHidden = true;
        roadmapItemNode.innerHTML = `<div class="node-icon"><i class="fas fa-${icon}"></i></div> <div class="node-step">${step > 9 ? step : '0' + step}</div>`;

        // Build content card
        roadmapItemContent.append(roadmapItemHeading, roadmapItemDescription, roadmapItemTag);

        // Attach all three as direct children of roadmap-item
        roadmapItem.append(roadmapItemNode, roadmapItemContent);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        }, { threshold: 0.1 });

        observer.observe(roadmapItem);

        return roadmapItem;
    }

    async function fetchFeatures() {

        try {

            const response = await fetch("http://localhost:3000/api/feature/OPTRAA");

            const { data, success } = await response.json();

            if (success) {
                data.forEach((el, index) => {
                    const roadmapItem = buildFeatureRoadMapItem(el.featureHeading, el.featureDescription, el.featureTags, index + 1, el.featureIcon);
                    console.log(roadmapItem);
                    featureRoadmap.append(roadmapItem);
                })
            }

        } catch (error) {
            throw new Error('Failed to fetch features: ' + error.message);
        }

    }

    fetchFeatures();

});
