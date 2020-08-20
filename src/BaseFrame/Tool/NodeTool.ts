/**
 * 常用节点处理方法
 */
namespace NodeTool {
    // 节点移除
    export function rmvChild(child: egret.DisplayObject) {
         if (child && child.parent) {
             child.parent.removeChild(child);
         }
    }

    // 对象舞台坐标获得;
    export function getStagePos(node: egret.DisplayObject): egret.Point {
        return node.parent.localToGlobal(node.x, node.y);
    }
}