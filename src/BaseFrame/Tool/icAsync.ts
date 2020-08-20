/**
 * 异步处理相关工具类;
 */
namespace icAsync {
    // 定时返回函数; 配合 await 函数, 可达到定时循环的目的;
    export async function timeout(ms) {
        return new Promise((resolve) => {
            egret.setTimeout(resolve, this, ms);
        });
    }

    /**
     * 一次性监听事件 转化为异步等待;
     * @param rslType, resolve 对应的事件类型;
     * @param rjtType, reject 对应的事件类型;
     */
    export async function onceEvtAsync(obj: egret.EventDispatcher, thisObj: any, rslType: string, rjtType?: string): Promise<egret.Event> {
        return new Promise<egret.Event>((resolve, reject) => {
            // 监听转 异步 async;
            obj.once(rslType, resolve, thisObj);
            if (rjtType) {
                obj.once(rjtType, reject, thisObj);
            }
        });
    }
}