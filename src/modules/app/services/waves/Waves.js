(function () {
    'use strict';

    /**
     * @param {Node} node
     * @param {Matcher} matcher
     * @param {WavesUtils} wavesUtils
     * @param {app.utils} utils
     * @return {Bancoin}
     */
    const factory = function (node, matcher, wavesUtils, utils) {

        class Bancoin {

            constructor() {
                /**
                 * @type {Node}
                 */
                this.node = node;
                /**
                 * @type {Matcher}
                 */
                this.matcher = matcher;
                /**
                 * @type {WavesUtils}
                 */
                this.utils = wavesUtils;
            }

        }

        return utils.bind(new Bancoin());
    };

    factory.$inject = ['node', 'matcher', 'wavesUtils', 'utils'];

    angular.module('app').factory('waves', factory);
})();
