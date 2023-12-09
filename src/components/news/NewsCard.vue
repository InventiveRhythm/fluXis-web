<script setup>
const props = defineProps({
    data: Object
});
</script>

<template>
    <div class="news-card">
        <div class="news-card-image">
            <img :src="data.image">
            <div class="">
                <div class="news-card-date">
                    <p>{{ data.date }}</p>
                </div>
                <div class="news-card-type">
                    <p>{{ data.type }}</p>
                </div>
            </div>
        </div>
        <div class="news-card-content">
            <h3>{{ data.title }}</h3>
            <p class="content">{{ data.content }}</p>
        </div>
    </div>
</template>

<style lang="scss">
.news-card {
    border-radius: 20px;
    overflow: hidden;
    background-color: var(--bg-secondary);
    margin: 10px;
    transition: all 0.2s ease-in-out;
    min-width: 360px;
    height: 250px;
    cursor: pointer;
    flex: 1 1 360px;
    display: flex;
    flex-direction: column;
    box-shadow: var(--box-shadow);
    z-index: 1;

    &:hover {
        transform: scale(1.02);
        box-shadow: var(--box-shadow-20);
        z-index: 2;
    }

    .news-card-image {
        height: 160px;
        display: grid;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 20px;

            grid-row: 1;
            grid-column: 1;
        }

        > div {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
            grid-row: 1;
            grid-column: 1;
            padding: 10px;
            
            > div {
                display: flex;
                font-size: 10px;
                background-color: var(--bg-secondary);
                padding: 2px 10px;
                border-radius: 15px;

                p {
                    opacity: .75;
                }
            }
        }
    }

    .news-card-content {
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;

        h3 {
            font-size: 1.2rem;
            text-align: left;
        }

        .content {
            font-size: 14px;
            margin: 0;
            text-align: left;
            height: 40px;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            opacity: .6;
        }
    }
}
</style>