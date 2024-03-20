<template>
    <div class="flex flex-col max-h-screen">
        <t-navbar v-if="!isLoading" :title="data.name" :fixed="false" left-arrow @left-click="back()" />

        <div class="p-3 flex-1 overflow-y-scroll">
            <div class="flex justify-center mt-2" v-if="isLoading">
                <t-loading size="26px" text="载入中..." />
            </div>

            <div v-if="!isLoading">
                <img @click="isViewImage = true" class="rounded-3xl max-h-52 w-full object-cover" style="object-position: center;" :src="`https://cqiecats.projectbs.cn/api/images/${data.image}`" alt="">
            </div>

            <div v-if="!isLoading" class="mt-3 font-bold text-xl">
                信息
                <span class="opacity-55 text-xs font-normal">(数据可能与实际存在出入)</span>
            </div>

            <div class="flex items-center">
                <Griddataitem
                    v-if="!isLoading"
                    title="名称"
                    :content="data.name"
                    class="flex-1"
                />

                <Griddataitem
                    v-if="!isLoading"
                    title="颜色"
                    :content="data.color"
                    class="flex-1"
                />
            </div>

            <div class="flex items-center">
                <Griddataitem
                    v-if="!isLoading"
                    title="性别"
                    :content="data.gender"
                    class="flex-1"
                />

                <Griddataitem
                    v-if="!isLoading"
                    title="出没区域"
                    :content="data.place.split('|')[0]"
                    class="flex-1"
                />
            </div>

            <div class="flex items-center">
                <Griddataitem
                    v-if="!isLoading"
                    title="状态"
                    :content="data.status"
                    class="flex-1"
                />

                <Griddataitem
                    v-if="!isLoading"
                    title="绝育情况"
                    :content="data.isSterilized"
                    class="flex-1"
                />
            </div>

            <div class="flex items-center">
                <Griddataitem
                    v-if="!isLoading"
                    title="性格"
                    :content="data.disposition"
                    class="flex-1"
                />

                <Griddataitem
                    v-if="!isLoading"
                    title="外貌"
                    :content="data.appearance"
                    class="flex-1"
                />
            </div>

            <div class="flex items-center">
                <Griddataitem
                    v-if="!isLoading"
                    title="关系"
                    :content="data.relationshipDesc"
                    class="flex-1"
                />
            </div>

            <div class="mt-3 flex">
                <div
                    v-if="!isLoading"
                    class="flex flex-col max-w-[48px] mr-3"
                    v-for="item in relatedData"
                    :key="item.id"
                    @click="router.push(`/cat/${item.id}`)"
                >
                    <t-avatar size="small" :image="`https://cqiecats.projectbs.cn/api/images/${item.image}`"></t-avatar>
                    <div class="text-sm text-center">{{ item.name }}</div>
                </div>
            </div>

            <div v-if="!isLoading" class="mt-3 opacity-50">出没区域示意</div>

            <div v-if="!isLoading" id="map" class="border-gray-300 border-solid border-2 mt-3 w-full h-64 rounded-3xl"></div>

            <div v-if="!isLoading" class="mt-5 font-bold text-xl">动态</div>
            
            <div class="mt-3" v-if="!isLoading">
                <div class="opacity-55 text-sm" v-if="!isLoading && postsData.length === 0">暂无数据。</div>

                <PostItem
                    v-for="item in postsData"
                    :key="item.postId"
                    :data="item"
                />

                <div class="text-center opacity-55 text-sm" v-if="!isLoading && postsData.length">暂无更多数据。</div>

                <div style="height: calc(86px);"></div>
            </div>
        </div>
    </div>

    <t-popup v-model="isShowEditPost" placement="bottom" style="padding: 0 16px;">
        <div class="text-center font-bold text-xl my-3">发布动态</div>
        
        <div class="opacity-50">内容</div>

        <t-textarea v-model="input.content" style="padding: 0;" name="内容" placeholder="编辑文字" autosize />

        <!-- <div class="opacity-50 mt-3">添加图片</div> -->

        <t-upload
            class="mt-5"
            multiple
            :max="10"
            style="padding: 0;"
            :action="'https://cqiecats.projectbs.cn/api/uploadimage'"
            :on-success="onImageUploadSuccess"
            :on-remove="onImageUploadRemove"
        />

        <div class="button-group my-3">
            <t-button @click="isShowEditPost = false">取消</t-button>
            <t-button theme="primary" class="ml-2" @click="releasePost()">发布</t-button>
        </div>
    </t-popup>

    <t-image-viewer v-model:images="image" v-model:visible="isViewImage" />

    <t-fab @click="isLogedIn ? isShowEditPost = true : isShowNotLogedInDialog = true" :icon="iconFunc" text="发布动态" />

    <t-dialog
        v-model:visible="isShowNotLogedInDialog"
        title="请先登录。"
        confirm-btn="我知道了"
    />
</template>

<script setup lang="ts">
import { h, ref, Ref, watch, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { AddIcon } from 'tdesign-icons-vue-next'
import maplibre from 'maplibre-gl'
import { isMapboxURL, transformMapboxUrl } from 'maplibregl-mapbox-request-transformer'
import 'maplibre-gl/dist/maplibre-gl.css'

import Griddataitem from '../components/griddataitem.vue'
import PostItem from '../components/postItem.vue'
import { Message } from 'tdesign-mobile-vue'

const iconFunc = () => h(AddIcon, { size: '24px' })
const isViewImage = ref(false)
let image = [] as string[]
const uploadImages = ref([] as string[])
const route = useRoute()
const router = useRouter()
const id = ref(route.params.id as string)
const data = ref({} as any)
const relatedData = ref([] as any)
const isLoading = ref(true)

const postsData = ref([] as any)

const isShowEditPost = ref(false)

const isLogedIn = ref(false)
const isShowNotLogedInDialog = ref(false)

const map = ref<maplibre.Map>() as Ref<maplibre.Map>
const mapboxKey = 'pk.eyJ1IjoieW93b3QiLCJhIjoiY2xmbmUxYnl2MGwzdjN5bXYzdnB2aGhjYyJ9.wDYgg0msNnU7ZetZLcJzUQ'

const back = () => {
    router.push('/list')
}

const input = ref({
    content: ''
})

const showMessage = (theme: string, content = '这是一条普通通知信息', duration = 5000) => {
    if (Message[theme]) {
        Message[theme]({
            offset: [10, 16],
            content,
            duration,
            icon: true,
            zIndex: 20000
        })
    }
}

const onImageUploadSuccess = (events: any) => {
    events.response.map((item: any) => {
        uploadImages.value.push(item.url)
    })
}

const onImageUploadRemove = (events: any) => {
    const index = events.index
    uploadImages.value.splice(index, 1)

    console.log(uploadImages.value)
}

const releasePost = async () => {
    const { data } = await axios.post('https://cqiecats.projectbs.cn/api/releasepost', {
        token: localStorage.getItem('token'),
        catId: id.value,
        content: input.value.content,
        images: JSON.stringify(uploadImages.value)
    })

    if (!data.error) {
        showMessage('success', data.data.message)
        isShowEditPost.value = false

        const data2 = (await axios.post('https://cqiecats.projectbs.cn/api/getpostslistbycatid', {
            catId: id.value
        })).data

        postsData.value = data2.data.reverse()

        input.value.content = ''
        uploadImages.value = []
    } else {
        showMessage('error', data.data.message)
    }
}

watch(route, async () => {
    await mount()
})

const mount = async () => {
    if (localStorage.getItem('token')) {
        const { data } = (await axios.post('https://cqiecats.projectbs.cn/api/queryuserinfo', {
            token: localStorage.getItem('token')
        }))

        if (data.data.status) {
            isLogedIn.value = true
        }

        isLoading.value = false
    } else {
        isLoading.value = false
    }

    id.value = route.params.id as string

    isLoading.value = true
    data.value = {}
    relatedData.value = []
    image = []
    postsData.value = []

    data.value = (await axios.post('https://cqiecats.projectbs.cn/api/getcatdetail', {
        id: id.value
    })).data.data

    image.push(`https://cqiecats.projectbs.cn/api/images/${data.value.image}`)

    console.log(data.value)

    JSON.parse(data.value.relationships).map(async (id: number) => {
        relatedData.value.push((await axios.post('https://cqiecats.projectbs.cn/api/getcatdetail', {
            id
        })).data.data)
    })

    postsData.value = (await axios.post('https://cqiecats.projectbs.cn/api/getpostslistbycatid', {
        catId: id.value
    })).data.data.reverse()

    isLoading.value = false

    setTimeout(() => {
        initMap()
    }, 500)
}

const initMap = () => {
    map.value = new maplibre.Map({
        container: 'map',
        style: {
            "version": 8,
            "sources": {
                "raster-tiles": {
                    "type": "raster",
                    "tiles": ["https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"],
                    "tileSize": 256
                }
            },
            "layers": [{
                "id": "simple-tiles",
                "type": "raster",
                "source": "raster-tiles",
                "minzoom": 3,
                "maxzoom": 22
            }]
        },
        center: [107.79942839007867, 37.093496518166944],
        zoom: 2,
        // transformRequest: (url, resourceType) => {
        //     if (isMapboxURL(url)) {
        //         return transformMapboxUrl(url, resourceType as string, mapboxKey)
        //     }

        //     return { url }
        // }
    })

    map.value.on('load', () => {
        map.value.on('click', e => {
            console.log(e.lngLat)
        })

        map.value.fitBounds(
            new maplibre.LngLatBounds(
                [106.59792953402552, 29.427526293688217],
                [106.59248720130404, 29.416522251964068]
            ),
            { padding: 10 }
        )

        const lng = data.value.place.split('|')[1].split(',')[0]
        const lat = data.value.place.split('|')[1].split(',')[1]

        console.log(lng)

        const el1 = document.createElement('div') as HTMLDivElement
        el1.className = 'markerInner'

        const el2 = document.createElement('div') as HTMLDivElement
        el2.className = 'markerOutter'

        const el3 = document.createElement('div') as HTMLDivElement
        el3.className = 'markerSpread'

        new maplibre.Marker({ element: el1 })
            .setLngLat([lng, lat])
            .addTo(map.value)

        new maplibre.Marker({ element: el2 })
            .setLngLat([lng, lat])
            .addTo(map.value)

        new maplibre.Marker({ element: el3 })
            .setLngLat([lng, lat])
            .addTo(map.value)
    })
}

onMounted(async () => {
    await mount()
})

onBeforeUnmount(() => {
    map.value.remove()
})
</script>

<style>
.button-group {
    background-color: var(--bg-color-demo, #fff);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    position: relative;
    border-bottom: 0.5px solid #e7e7e7;

    .t-button {
        height: 32px;
        flex: 1;

        &:not(:last-child) {
            flex: 1;
            margin-right: 16px;
        }
    }
}
</style>