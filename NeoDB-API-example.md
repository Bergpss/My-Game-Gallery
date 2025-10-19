Get holding marks on current user's shelf

Shelf's type should be one of wishlist / progress / complete / dropped; category is optional, marks for all categories will be returned if not specified.


### Request URL

`https://neodb.social/api/me/shelf/progress?category=game&page=1`


### Curl
```
curl -X 'GET' \
  'https://neodb.social/api/me/shelf/progress?category=game&page=1' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer MY_TOKEN'
```


### Response Body
```
{
  "data": [
    {
      "shelf_type": "progress",
      "visibility": 0,
      "post_id": 502696785360343300,
      "item": {
        "type": "Game",
        "title": "印蒂卡",
        "description": "《这是我的战争》《冰汽时代》开发商11 bit studios官宣将发行新作《印蒂卡》（《INDIKA》），该游戏由独立工作室Odd Meter开发，是一款第三人称剧情驱动型游戏。游戏的舞台设定在十九世纪末，宗教愿景与残酷现实相互冲突的架空俄罗斯，讲述了一位年轻修女与她不寻常的旅伴魔鬼撒旦一同踏上自我发现之旅的故事。游戏预计于2024年第一季度在 Steam 平台推出，支持简体中文。",
        "localized_title": [
          {
            "lang": "zh-cn",
            "text": "印蒂卡"
          },
          {
            "lang": "en",
            "text": "INDIKA"
          }
        ],
        "localized_description": [
          {
            "lang": "zh-cn",
            "text": "《这是我的战争》《冰汽时代》开发商11 bit studios官宣将发行新作《印蒂卡》（《INDIKA》），该游戏由独立工作室Odd Meter开发，是一款第三人称剧情驱动型游戏。游戏的舞台设定在十九世纪末，宗教愿景与残酷现实相互冲突的架空俄罗斯，讲述了一位年轻修女与她不寻常的旅伴魔鬼撒旦一同踏上自我发现之旅的故事。游戏预计于2024年第一季度在 Steam 平台推出，支持简体中文。"
          }
        ],
        "cover_image_url": "https://neodb.social/m/item/doubangame/2024/07/16/e51ace40-0fac-4675-abf3-46dbd13d73f5.jpg",
        "rating": 9.2,
        "rating_count": 5,
        "rating_distribution": [
          0,
          0,
          0,
          40,
          60
        ],
        "tags": [],
        "brief": "《这是我的战争》《冰汽时代》开发商11 bit studios官宣将发行新作《印蒂卡》（《INDIKA》），该游戏由独立工作室Odd Meter开发，是一款第三人称剧情驱动型游戏。游戏的舞台设定在十九世纪末，宗教愿景与残酷现实相互冲突的架空俄罗斯，讲述了一位年轻修女与她不寻常的旅伴魔鬼撒旦一同踏上自我发现之旅的故事。游戏预计于2024年第一季度在 Steam 平台推出，支持简体中文。",
        "id": "https://neodb.social/game/309pMURhdnq7lrXxNt4O1n",
        "uuid": "309pMURhdnq7lrXxNt4O1n",
        "url": "/game/309pMURhdnq7lrXxNt4O1n",
        "api_url": "/api/game/309pMURhdnq7lrXxNt4O1n",
        "category": "game",
        "parent_uuid": null,
        "display_title": "印蒂卡",
        "external_resources": [
          {
            "url": "https://www.douban.com/game/36630604/"
          }
        ]
      },
      "created_time": "2025-10-19T11:17:33.231Z",
      "comment_text": null,
      "rating_grade": null,
      "tags": []
    },
    {
      "shelf_type": "progress",
      "visibility": 0,
      "post_id": 502323180124057500,
      "item": {
        "type": "Game",
        "title": "最后生还者 第一部",
        "description": "2022年电子游戏",
        "localized_title": [
          {
            "lang": "zh-cn",
            "text": "最后生还者 第一部"
          },
          {
            "lang": "zh-cn",
            "text": "美国末日 第一部"
          },
          {
            "lang": "zh-cn",
            "text": "最后生还者 重制版"
          },
          {
            "lang": "zh-cn",
            "text": "美国末日 重制版"
          },
          {
            "lang": "en",
            "text": "The Last of Us Part I"
          },
          {
            "lang": "zh",
            "text": "最后生还者 第I章"
          },
          {
            "lang": "zh-cn",
            "text": "最后生还者 第I章"
          },
          {
            "lang": "zh-hant",
            "text": "最後生還者一部曲"
          },
          {
            "lang": "es",
            "text": "The Last of Us Part I"
          },
          {
            "lang": "fr",
            "text": "The Last of Us Part I"
          },
          {
            "lang": "de",
            "text": "The Last of Us Part I"
          },
          {
            "lang": "pt",
            "text": "The Last of Us Part I"
          },
          {
            "lang": "ja",
            "text": "The Last of Us Part I"
          },
          {
            "lang": "ko",
            "text": "더 라스트 오브 어스 파트 I"
          },
          {
            "lang": "zh-cn",
            "text": "最后生还者：第一部 重制版"
          },
          {
            "lang": "zh-tw",
            "text": "最後生還者 一部曲"
          },
          {
            "lang": "en",
            "text": "TLoU1"
          }
        ],
        "localized_description": [
          {
            "lang": "no",
            "text": "包括Tom Henderson的多个消息源称，《The Last of Us Remake》的制作已经接近完工，可能会在2022下半年稍晚时候公布。\r\n\r\nGame Reactor发表的一篇文章称本作不单单会提高游戏性能和分辨率，还将提升游戏玩法，利用PS5的硬件性能和《最后生还者2》中更强大的引擎，添加新的游戏要素。\r\n\r\n外媒记者Jason Schreier表示顽皮狗正在运作该项目。\r\n\r\n创立了Visual Arts Service Group的Michael Mumbauer曾主导成立了一个大约30名开发人员的未命名的新团队为本作的开发做了前期工作。"
          },
          {
            "lang": "zh",
            "text": "2022年电子游戏"
          },
          {
            "lang": "zh-cn",
            "text": "2022年电子游戏"
          },
          {
            "lang": "zh-hant",
            "text": "2022年電子遊戲"
          },
          {
            "lang": "en",
            "text": "2022 action-adventure video game developed by Naughty Dog; remake version of 2013 video game The Last of Us"
          },
          {
            "lang": "es",
            "text": "videojuego de 2022"
          },
          {
            "lang": "fr",
            "text": "remake de jeu vidéo de 2022"
          },
          {
            "lang": "de",
            "text": "Computerspiel aus dem Jahr 2022"
          },
          {
            "lang": "pt",
            "text": "jogo eletrônico de 2022 desenvolvido pela Naughty Dog"
          },
          {
            "lang": "ko",
            "text": "2022년 비디오 게임"
          },
          {
            "lang": "en",
            "text": "Experience the emotional storytelling and unforgettable characters of Joel and Ellie in The Last of Us, winner of over 200 Game of the Year awards and now rebuilt for PlayStation 5.\n\nEnjoy a total overhaul of the original experience, faithfully reproduced but incorporating modernized gameplay, improved controls and expanded accessibility options. Plus, feel immersed with improved effects and enhanced exploration and combat.\n\nIt also includes the Left Behind story DLC.\n\nTwenty years after a mutated fungus started turning people all over the world into deadly zombies, humans become an endangered species. Joel, a Texan in his forties with the \"emotional range of a teaspoon\" (to quote Hermione from Harry Potter), finds himself responsible with the safety of a fourteen year old girl named Ellie whom he must smuggle to a militia group called the Fireflies. And as if the infected aren't enough of a hassle, they also have to deal with the authorities who wouldn't let them leave the quarantine zone, as well as other survivors capable of killing anyone who might have something useful in their backpacks."
          },
          {
            "lang": "zh-cn",
            "text": "该版本包含：\r\n- 《The Last of Us》完整单人模式剧情 (PS5)；\r\n- 游戏前传《Left Behind》，体验那段改变了艾莉与挚友莱莉命运的往事。\r\n\r\n进入《The Last of Us》的游戏世界，体验那段动人心弦的剧情，见证角色们的命运。游戏荣获 200 余项 TGA 大奖，现已在 PlayStation 5 主机平台全面重制。\r\n\r\n人类文明风雨飘摇，感染者与人类幸存者横行各地。故事的主人公，饱经风霜的乔尔，受雇将 14 岁的艾莉“走私”到军事隔离区外。然而，这份看似平常的差事，最终竟成了一场艰难曲折的横跨美国之旅。\r\n\r\n- 使用 Naughty Dog 最新的 PS5 引擎技术全面重制，呈现更精细的视觉效果，完美适配的 DualSense 无线控制器使用体验，以及更多惊喜。\r\n- 针对原版游戏体验进行彻底革新，在尊重原有游戏内容的基础上，引入更先进的游戏机制，更舒适的操作手感，以及更多的易用性选项。\r\n- 打造更具沉浸感的游戏氛围，带来更优秀的环境叙事、画面效果、面部表现，以及更好的探索与战斗体验。"
          }
        ],
        "cover_image_url": "https://neodb.social/m/item/doubangame/2024/07/16/6ff14ce7-b823-4f28-80f5-0bfe33e2cc9f.jpg",
        "rating": 9.3,
        "rating_count": 36,
        "rating_distribution": [
          0,
          0,
          0,
          22,
          77
        ],
        "tags": [
          "3a",
          "9",
          "9分",
          "act",
          "avg",
          "ps4",
          "ps5",
          "tps",
          "冒险",
          "剧情",
          "动作",
          "射击",
          "游戏",
          "视频"
        ],
        "brief": "2022年电子游戏",
        "id": "https://neodb.social/game/3jfWPLjDUEb1AiRD4fznFe",
        "uuid": "3jfWPLjDUEb1AiRD4fznFe",
        "url": "/game/3jfWPLjDUEb1AiRD4fznFe",
        "api_url": "/api/game/3jfWPLjDUEb1AiRD4fznFe",
        "category": "game",
        "parent_uuid": null,
        "display_title": "最后生还者 第一部",
        "external_resources": [
          {
            "url": "https://store.steampowered.com/app/1888930"
          },
          {
            "url": "https://www.douban.com/game/35725781/"
          },
          {
            "url": "https://www.wikidata.org/wiki/Q113377532"
          },
          {
            "url": "https://bgm.tv/subject/387052"
          },
          {
            "url": "https://eggplant.place/game/5xf8HwBtwSSymqsm91dvKE"
          },
          {
            "url": "https://www.igdb.com/games/the-last-of-us-part-i"
          }
        ]
      },
      "created_time": "2025-10-18T10:32:58.795Z",
      "comment_text": null,
      "rating_grade": null,
      "tags": []
    }
  ],
  "pages": 1,
  "count": 2
}

```

### Response Header

```
alt-svc: h3=":443"; ma=86400 
 cf-cache-status: DYNAMIC 
 cf-ray: 990fe2457ada5ff0-SIN 
 content-encoding: zstd 
 content-language: zh-hans 
 content-type: application/json; charset=utf-8 
 cross-origin-opener-policy: same-origin 
 date: Sun,19 Oct 2025 11:20:02 GMT 
 nel: {"report_to":"cf-nel","success_fraction":0.0,"max_age":604800} 
 referrer-policy: same-origin 
 report-to: {"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/report/v4?s=omaWflzA0LV2Ld43WuoUald7C4yR8EFyFS6tteRIWTHJUkROm%2BL5p5M%2FHQCL89VVyYiWFRvQJABLeM%2Bi19qNxIm1tBpRYdbD5FFWlQ%3D%3D"}]} 
 server: cloudflare 
 strict-transport-security: max-age=0; includeSubDomains 
 vary: Accept-Language,origin,Cookie 
 x-content-type-options: nosniff 
 x-frame-options: DENY 

```