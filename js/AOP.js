/**
 * 前端切面模式（AOP, Aspect Oriented Progrumming）
 */
(function (global) {
    /**
     * Aspect Oriented Progrumming
     * @constructor
     */
    let AOP = function () {
        let _this = AOP.prototype;

        // 当传入俩个参数时，检测 object 调用
        if ((arguments.length == 2) && (typeof arguments[0] === 'object')) {
            _this._target = arguments[0];
            _this._method = arguments[1];
        }
        // 仅传入一个参数时，执行 function 调用isFunction(args[0])
        else if ((arguments.length == 1) && (arguments[0] instanceof Function)) {
            _this._target = null;
            _this._method = arguments[0];
        }
        // 错误调用
        else {
            throw new Error('AOP:arguments error!');
        }

        return _this;
    }

    AOP.prototype = {
        /**
         * 前插函数
         * @param advice AOP通知
         */
        before: function (advice = null) {
            console.log('AOP/before:this',this);
            let target = this._target;// 目标对象
            let method = this._method;// 目标方法
            let advice_func = advice || function () {
            };// 插入方法
            let origin_func = !!target ? target[method] : method;// 原始方法
            let new_func = function () {// 插值后新方法
                (advice_func)(), origin_func.apply(target || this, arguments);
            }
            // 检测 object 调用
            if (!!target && target[method]) {
                target[method] = new_func;
            }
            // 执行 function 调用
            else if (!!method) {
                new_func();
            }
            // 错误调用
            else
                throw new Error('AOP:arguments error!');
        },
        /**
         * 后插函数
         * @param advice AOP通知
         */
        after: function (advice = null) {
            let target = this._target;// 目标对象
            let method = this._method;// 目标方法
            let advice_func = advice || function () {};             // 插入方法
            let origin_func = !!target ? target[method] : method;   // 原始方法
            // 插值后新方法
            let new_func = function () {
                origin_func.apply(target || this, arguments), (advice_func)();
            }
            // 检测 object 调用
            if (!!target && target[method]) {
                target[method] = new_func;
            }
            // 执行 function 调用
            else if (!!method) {
                new_func();
            }
            // 错误调用
            else
                throw new Error('AOP:arguments error!');
        }

    }

    // 全局调用
    global.AOP = AOP;
})(window);