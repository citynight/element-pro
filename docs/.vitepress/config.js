module.exports = {
  title: 'Element Pro',
  description: 'A Vue 3 based component library',
  themeConfig: {
    lastUpdatedText: ' 最后更新时间',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    repo: 'https://github.com/citynight/element-pro',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-PRESENT Element Pro'
    },
    nav: [
      { text: '指南', link: '/guide/installation' },
      { text: '组件', link: '/components/icon' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速上手', link: '/guide/quick-start' }
          ]
        }
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            { text: 'Icon 图标', link: '/components/icon' },
            { text: '日期范围选择', link: '/components/date-range-picker' }
          ]
        }
      ]
    }
  }
}
