<template>
    <div :class="classObj" class="app-wrapper">
        <div v-if="device==='mobile'&&sidebar.opened"
             class="drawer-bg"
             @click="handleClickOutside"></div>

        <sidebar class="sidebar-container" />

        <div :class="{hasTagsView:needTagsView}" class="main-container">
            <div :class="{'fixed-header':fixedHeader}">
                <navbar />
                <tags-view v-if="needTagsView" />
            </div>

            <app-main />

            <right-panel v-if="showSettings" :buttonTop="buttonTop">
                <settings  />
            </right-panel>
        </div>

    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import ResizeMixin from './mixin/ResizeHandler'
    import RightPanel from '@/components/RightPanel'
    import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'

    export default {
        name: "index",
        components: {
            RightPanel,
            Sidebar,
            Navbar,
            TagsView,
            AppMain,
            Settings
        },
        mixins: [ResizeMixin],
        computed: {
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
                showSettings: state => state.settings.showSettings,
                needTagsView: state => state.settings.tagsView,
                fixedHeader: state => state.settings.fixedHeader
            }),
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === 'mobile'
                }
            },
            buttonTop(){
                return this.fixedHeader?180:100;
            }

        },
        methods: {
            handleClickOutside() {
                this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
            }
        }
    }
</script>

<style scoped>

</style>
