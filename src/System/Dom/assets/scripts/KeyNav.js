/**
 * @author xuld
 */

using("System.Dom.Base");

/**
 * ���ü����ļ�д��
 */
Dom.keys = {
    '13': 'enter',
    '10': 'enter',
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    esc: 27,
    tab: 9,
    backspace: 8,
    'delete': 46,
    space: 32
};

Dom.implement({

    /**
     * ��ĳ����ִ�к�Ļص�������
     * @param {Object} {keyCode: func} ��ʽ�� JSON ���� keyCode ����ʹ�� Dom.keys �ļ�д��
     * @return this
     */
    keyNav: function (options, scope) {
        var opt = {};

        // ���� Dom.keys ����ƥ���ֵ��
        for (var key in options) {
            opt[Dom.keys[key] || key] = options[key];
        }

        this.on('keydown', function (e) {
            var keyCode = e.keyCode;

            // �������ָ���ļ�ֵ��
            if (opt[keyCode]) {
                return opt[keyCode].call(this, e) !== true;
            }

        }, scope);

        // ������˻س��¼���
        // IE 6 ֻ���� keypress �������س��¼���
        if (opt.enter) {
            this.on('keypress', function (e) {
                var keyCode = e.keyCode;
                if (keyCode === 13 || keyCode === 10) {
                    return opt.enter.call(this, e) !== true;
                }
            });
        }

        if (opt.other) {
            this.on('keyup', function (e) {
                var keyCode = e.keyCode;
                if (!opt[keyCode] && !(opt.enter && (keyCode === 13 || keyCode === 10))) {
                    return opt.other.call(this, e);
                }
            });
        }

        return this;
    }

});