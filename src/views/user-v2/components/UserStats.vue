<script setup>
const props = defineProps({
    user: Object
});

function formatScore(score) {
    return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatAccuracy(accuracy) {
    return accuracy.toFixed(2) + "%";
}
</script>

<template>
    <div class="user-stats">
        <div>
            <p class="stat">Overall Rating</p>
            <p class="num">{{ user.ovr }}</p>
        </div>
        <div>
            <p class="stat">Potential Rating</p>
            <p class="num">{{ user.ptr }}</p>
        </div>
        <div>
            <p class="stat">Overall Accuracy</p>
            <p class="num">{{ formatAccuracy(user.ova) }}</p>
        </div>
        <div>
            <p class="stat">Ranked Score</p>
            <p class="num">{{ formatScore(user.ranked_score) }}</p>
        </div>
        <div>
            <p class="stat">Max Combo</p>
            <p class="num">{{ user.max_combo }}x</p>
        </div>
    </div>
</template>

<style lang="scss">
.user-stats {
    display: flex;
    width: 100%;
    height: 100px;
    justify-content: center;
    align-items: center;

    border-radius: 20px;
    background: var(--bg-secondary);

    > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        line-height: 1.1;

        .stat {
            font-size: 16px;
            opacity: .8;
        }

        .num {
            font-size: 32px;
        }
    }
}
</style>