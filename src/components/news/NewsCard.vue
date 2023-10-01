<script setup>
const props = defineProps({
    title: String,
    content: String,
    image: String,
    date: String,
    author: String
});
</script>

<template>
    <div class="news-card">
        <div class="news-card-image">
            <img :src="image">
        </div>
        <div class="news-card-content">
            <h3>{{ title }}</h3>
            <p class="content">{{ content }}</p>
            <div class="news-card-footer">
                <div class="news-card-footer-left">
                    <p>{{ date }}</p>
                </div>
                <div class="news-card-footer-right">
                    by <p>{{ author }}</p>
                </div>
            </div>
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
    height: 280px;
    cursor: pointer;
    flex: 1 1 360px;
    display: flex;
    flex-direction: column;

    &:hover {
        transform: scale(1.02);
    }

    .news-card-image {
        height: 160px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 20px;
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
            margin-bottom: 10px;
            text-align: left;
            height: 40px;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            display: -webkit-box;
        }

        .news-card-footer {
            display: flex;
            justify-content: space-between;

            .news-card-footer-left {
                p {
                    font-size: 12px;
                    color: var(--color-text-2);
                }
            }

            .news-card-footer-right {
                text-align: right;
                display: flex;
                align-items: center;
                font-size: 12px;
                
                p {
                    font-size: 12px;
                    color: var(--color-text-2);
                    margin: 0;
                    margin-left: 5px;
                }
            }
        }
    }
}
</style>