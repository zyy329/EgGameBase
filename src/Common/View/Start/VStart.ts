/**
 * 开始 页面
 */
class VStart extends VPop{
        // 其他变量;
        private isFinish = false;       // 开场动画是否播放完毕 标记;

        // 存取函数;
        public IsFinish(): boolean {
            return this.isFinish;
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.skinName = "skin.Start";

            // // 缓动渐显 LOGO 图片;
            // let image = new eui.Image();
            // image.source = "";

            // 开场动画是否播放完毕;  测试用, 替代缓动耗时;
            egret.setTimeout(() => {
                this.isFinish = true;
            }, this, 1000)
            //this.isFinish = true;
        }
}