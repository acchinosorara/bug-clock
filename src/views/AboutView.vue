<script setup lang="ts">
import Dot from '~icons/my-icons/list-dot'
</script>

<template>
    <section class="sec">
        <div class="sec-info">
            <h1 class="sec-info-title">
                <span class="mono">ABOUT</span>
                <p>このサイトについて</p>
            </h1>
            <p class="sec-text">
                当サイト「バグった時計」は、その名のとおりバグった時計を観賞するだけの誰得サイトです。<br />
                一種のエンターテイメントとして、バグ風の演出をお楽しみください。
            </p>
        </div>
        <div class="sec-cont">
            <h2 class="sec-cont-title">注意事項</h2>
            <ol class="sec-cont-ol">
                <li>
                    <div>
                        <p class="sec-text">
                            以下のいずれかに該当する場合、閲覧により心身に不調をきたす場合があります。<br />
                            ご不安な場合は、閲覧を控えることをおすすめします。
                        </p>
                        <ul class="sec-cont-ul">
                            <li class="item">
                                <Dot />
                                バグった画面・挙動に抵抗のある方
                            </li>
                            <li class="item">
                                <Dot />
                                体調の優れない方
                            </li>
                            <li class="item">
                                <Dot />
                                視覚刺激に敏感な方
                            </li>
                            <li class="item">
                                <Dot />
                                視覚刺激により心身に不調をきたした経験などがある方
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <p>
                        長時間の閲覧により、目やお使いのデバイス（スマートフォン・パソコンなど）に負荷がかかる場合があります。長時間閲覧する際は、適度な休憩をお願いいたします。<br />
                        また、動作が重い場合、ページの再読み込み（リロード）で改善されることがありますので、お試しください。
                    </p>
                </li>
            </ol>
        </div>
        <div class="sec-cont">
            <h2 class="sec-cont-title">その他</h2>
            <p>
                当サイトは、機能追加・改善など適宜アップデートしていく予定です。内容は予告なく変更される場合がありますので、ご了承ください。
            </p>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.sec {
    @include sec-size;
    @include wrap;
    color: $light300;

    &-info {
        margin-top: var(--header-height);
        padding-bottom: 3em;

        &-title {
            @include flex-center;
            flex-direction: column;
            font-size: 3rem;
            margin-bottom: 4rem;

            span {
                color: $light;
                font-weight: bold;
                letter-spacing: 0.1em;
            }

            p {
                font-size: 0.3em;
                letter-spacing: 0.075em;
                margin-top: 0.5em;
            }
        }
    }

    &-cont {
        border-top: solid 1px $dark300;
        padding-block: 3em;

        &-title {
            position: relative;
            color: $light200;
            font-size: 1.5rem;
            font-weight: bold;
            letter-spacing: 0.075em;
            margin-bottom: 1em;
        }

        &-ol {
            counter-reset: index;

            > li {
                position: relative;
                display: flex;
                align-items: flex-start;
                padding-left: 2.5em;

                &:not(:last-child) {
                    margin-bottom: 1.5em;
                }

                &::before {
                    @include mono;
                    counter-increment: index;
                    content: counter(index) '..';
                    position: absolute;
                    top: 0.1em;
                    left: 0;
                }
            }
        }

        &-ul {
            background-color: $dark200;
            margin-top: 1em;
            padding: 1em 1.5em;

            .item {
                position: relative;
                padding-left: 1.2em;
                color: $light300;

                &:not(:last-child) {
                    margin-bottom: 0.5em;
                }
            }

            svg {
                position: absolute;
                width: 1em;
                height: auto;
                top: 0;
                left: 0;
            }
        }
    }
}
</style>
