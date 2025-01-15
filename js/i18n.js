// i18n.js

const i18n = {
    defaultLanguage: 'zh', // 修改默认语言为中文
    currentLanguage: 'zh', // 修改初始语言为中文
    languages: ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'ru', 'es', 'fr', 'it', 'pt', 'ar'], // 支持的语言
    translations: {}, // 存储翻译数据
    languageSelect: null, // 下拉选择元素
    init: async function(options) {
        this.defaultLanguage = options.defaultLanguage || 'zh';  //修改默认语言
        this.currentLanguage = localStorage.getItem('language') || this.defaultLanguage;  //获取缓存的语言，没有则用默认语言
        this.languages = options.languages || ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'ru', 'es', 'fr', 'it', 'pt', 'ar'];

        // 初始化 i18next
        i18next
            .init({
                lng: this.currentLanguage, // 默认语言
                fallbackLng: this.defaultLanguage, // 回退语言
                resources: {
                    en: {
                        translation: await this.loadTranslations('en')
                    },
                    'zh-CN': {
                        translation: await this.loadTranslations('zh-CN')
                    },
                    'zh-TW': {
                        translation: await this.loadTranslations('zh-TW')
                    },
                    ja: {
                        translation: await this.loadTranslations('ja')
                    },
                    ko: {
                        translation: await this.loadTranslations('ko')
                    },
                    ru: {
                        translation: await this.loadTranslations('ru')
                    },
                    es: {
                        translation: await this.loadTranslations('es')
                    },
                    fr: {
                        translation: await this.loadTranslations('fr')
                    },
                    it: {
                        translation: await this.loadTranslations('it')
                    },
                    pt: {
                        translation: await this.loadTranslations('pt')
                    },
                    ar: {
                        translation: await this.loadTranslations('ar')
                    }
                }
            }, function(err, t) {
                // 翻译加载完成后更新文本
                i18n.updateContent(err,t);

            });
        this.setupLanguageSelect();
        if(options.onLanguageChange){
            this.onLanguageChange = options.onLanguageChange
        }

    },
    loadTranslations: async function(lang) {
        const response = await fetch(`i18n/${lang}.json`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error(`Failed to load ${lang} translations:`, response.status, response.statusText);
            return {};
        }
    },
    setupLanguageSelect: function() {
        this.languageSelect = document.createElement('div');
        this.languageSelect.classList.add('i18n-language-select');
        this.languageSelect.innerHTML = `
        <div class="selected-language">
            <span>${this.getLanguageLabel(this.currentLanguage)}</span>
        </div>
        <ul class="language-list">
        ${this.languages.map(lang => `<li><a data-lang="${lang}">${this.getLanguageLabel(lang)}</a></li>`).join('')}
        </ul>
    `;
        document.body.appendChild(this.languageSelect);
        const selectBox = document.querySelector('.i18n-language-select')
        selectBox.addEventListener('click', function(event) {
            selectBox.classList.toggle('active');
            const target = event.target;
            if (target.tagName === 'A') {
                const lang = target.getAttribute('data-lang');
                i18n.changeLanguage(lang);
                selectBox.classList.remove('active');
            }
        });
    },
    getLanguageLabel: function(lang) {
        switch (lang) {
            case 'en': return 'English';
            case 'zh-CN': return '简体中文';
            case 'zh-TW': return '繁体中文';
            case 'ja': return '日本語';
            case 'ko': return '한국어';
            case 'ru': return 'Русский';
            case 'es': return 'Español';
            case 'fr': return 'Français';
            case 'it': return 'Italiano';
            case 'pt': return 'Português';
            case 'ar': return 'العربية';
            default: return 'English';
        }
    },
    changeLanguage: function(lang) {
        i18next.changeLanguage(lang, (err,t) => {
            this.currentLanguage = lang;
            this.languageSelect.querySelector('.selected-language span').textContent = this.getLanguageLabel(lang);
            this.updateContent(err,t);
            localStorage.setItem('language', lang)
            if(this.onLanguageChange){
                this.onLanguageChange(lang)
            }
        });
    },
    updateContent: function(err,t) {
        // 获取所有带有 data-i18n 属性的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (key) {
                if((element.tagName === 'INPUT' && element.type === 'submit')) {
                    element.value = t(key);
                } else if(element.tagName === 'INPUT' || element.tagName === 'TEXTAREA'){
                    element.placeholder = t(key);
                } else {
                    const translatedHTML = i18next.t(key);
                    element.innerHTML = translatedHTML
                }
            }
        });
    }
};
