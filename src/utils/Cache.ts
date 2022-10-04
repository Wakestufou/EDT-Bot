import cache from 'node-cache';
import ical from 'node-ical';
import Logger from './Logger';
import { AdeOption } from '../types/ade';

class MyCache {
    private _myCache: cache;

    constructor() {
        this._myCache = new cache({ stdTTL: 12 * 60 * 60 });
    }

    getCache(): cache {
        return this._myCache;
    }

    getCacheAde(): AdeOption[] {
        if (this._myCache.has('ade')) {
            Logger.info('Ade loaded on cache', 'CACHE');
            return this._myCache.get('ade') as AdeOption[];
        } else {
            Logger.info('Ade loaded on url', 'CACHE');
            this.loadCache();
            return this._myCache.get('ade') as AdeOption[];
        }
    }

    loadCache() {
        ical.fromURL(process.env.URL_ICS as string, {}, (err, data) => {
            if (err) {
                Logger.error('Error cache', err);
                return;
            }

            const tab = [];

            for (const k in data) {
                if (Object.prototype.hasOwnProperty.call(data, k)) {
                    const ev = data[k];
                    if (ev.type === 'VEVENT') {
                        tab.push(ev);
                    }
                }
            }

            tab.sort(
                (a, b) =>
                    new Date(b.start).getTime() - new Date(a.start).getTime()
            );

            tab.reverse();

            this._myCache.set('ade', tab);
        });
    }
}

export default new MyCache();
