(function () {
    'use strict';

    /**
     *
     * @param {INotification} notification
     * @param {User} user
     * @param {Migration} migration
     */
    const factory = function (notification, user, migration, utils) {

        const MIGRATION_LIST = [
            '1.0.0',
            '1.0.3',
            '1.0.5',
            '1.0.6',
            '1.0.7',
            '1.0.8',
            '1.0.10',
            '1.0.14',
            '1.0.15',
            '1.0.18',
            '1.0.21',
            '1.0.22',
            '1.0.25',
            '1.0.27',
            '1.0.28',
            '1.0.29',
            '1.0.30',
            '1.0.32',
            '1.0.33',
            '1.0.36',
            '1.0.37',
            '1.0.40',
            '1.0.41',
            '1.0.42',
            '1.1.0',
            '1.2.0',
            '1.2.1',
            '1.2.2',
            '1.2.3',
            '1.2.6',
            '1.2.8',
            '1.3.0',
            '1.3.2',
            '1.3.5',
            '1.3.7',
            '1.3.9',
            '1.3.18'
        ];

        /**
         * @param {string|Array<string>} version
         */
        function addVersions(version) {
            const versions = user.getSetting('whatsNewList').slice();
            utils.toArray(version).forEach((version) => {
                versions.push(version);
            });
            user.setSetting('whatsNewList', versions);
        }

        function removeVersion(version) {
            const versions = user.getSetting('whatsNewList').slice();
            const index = versions.indexOf(version);
            if (index !== -1) {
                versions.splice(index, 1);
                user.setSetting('whatsNewList', versions);
            }
        }

        function unique(list1, list2) {
            const hash = Object.create(null);
            list1.concat(list2).forEach((version) => {
                hash[version] = true;
            });
            return Object.keys(hash);
        }

        function handleLogin() {
            const notShownUpdates = user.getSetting('whatsNewList')
                .filter(version => {
                    if (migration.gt(version, WavesApp.version)) {
                        removeVersion(version);
                        return false;
                    }
                    return true;
                });
            const lastOpenVersion = user.getSetting('lastOpenVersion');
            const newVersionList = migration.migrateFrom(lastOpenVersion || WavesApp.version, MIGRATION_LIST);

            migration.sort(unique(newVersionList, notShownUpdates)).forEach((version) => {
                notification.info({
                    ns: 'app.utils',
                    title: {
                        literal: 'utils.whatsNew.title',
                        params: { version }
                    },
                    body: {
                        literal: `utils.whatsNew.body.${version.replace(/\./g, '_')}`
                    },
                    onClose() {
                        removeVersion(version);
                    }
                }, -1);
            });
            addVersions(newVersionList);

            user.setSetting('lastOpenVersion', WavesApp.version);
        }

        user.onLogin().then(() => {
            handleLogin();
            user.loginSignal.on(handleLogin);
        });

        return Object.create(null);
    };

    factory.$inject = ['notification', 'user', 'migration', 'utils'];

    angular.module('app.utils').factory('whatsNew', factory);
})();
