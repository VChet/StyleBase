# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.5.1](https://github.com/VChet/StyleBase/compare/v4.5.0...v4.5.1) (2021-05-04)


### Bug Fixes

* **maintenance:** remove status page link ([7b2ec56](https://github.com/VChet/StyleBase/commit/7b2ec5642b06de5d341ef8bd4bc3b769f5014fc2))
* **scroll:** decrease throttle limit ([3402a4b](https://github.com/VChet/StyleBase/commit/3402a4bb3041e1372101fdcdddb065cf7e360eee))

## [4.5.0](https://github.com/VChet/StyleBase/compare/v4.4.3...v4.5.0) (2021-04-24)


### Features

* **confirmation:** add loading state ([3fb01ba](https://github.com/VChet/StyleBase/commit/3fb01bae3f2b6051116d6546aee43132be94afaf))
* **profile:** add profile page ([bef9568](https://github.com/VChet/StyleBase/commit/bef95681d847f90141b16af952bfea62940aff7d))
* **profile:** add style info editor ([2d82d33](https://github.com/VChet/StyleBase/commit/2d82d3344100dcb7d0da3561e8a4935fbc35ce53))


### Bug Fixes

* **add style:** update user styles on creation ([7aa833e](https://github.com/VChet/StyleBase/commit/7aa833ea4398b9574cf2aabcf92359e8d6fab00a))
* **style editor:** update styles ([00d2b56](https://github.com/VChet/StyleBase/commit/00d2b5624cde14baa16fa6bb6c01076dd3b4d745))

### [4.4.3](https://github.com/VChet/StyleBase/compare/v4.4.2...v4.4.3) (2021-04-04)


### Bug Fixes

* **preview:** render all gif frames instead of only the first one ([133c7ce](https://github.com/VChet/StyleBase/commit/133c7ce86ae99ca58567e6f6bee7ceb688cc5e6d))

### [4.4.2](https://github.com/VChet/StyleBase/compare/v4.4.1...v4.4.2) (2021-03-23)


### Bug Fixes

* **preview:** fallback to original url if resize service returned error ([d4f64bd](https://github.com/VChet/StyleBase/commit/d4f64bdc7b01f65e07b2996f790033695a5d1826))

### [4.4.1](https://github.com/VChet/StyleBase/compare/v4.4.0...v4.4.1) (2021-03-21)


### Bug Fixes

* **maintenance:** add styles for dark color-scheme, add status page ([6c45282](https://github.com/VChet/StyleBase/commit/6c452827243a862ce17768d40244ff72a58060e5))
* **preview:** keep protocol in 'images.weserv.nl' request ([452b229](https://github.com/VChet/StyleBase/commit/452b2295426c90962cc81a161a0de373dfbcce7d))

## [4.4.0](https://github.com/VChet/StyleBase/compare/v4.3.0...v4.4.0) (2021-03-21)


### Features

* **api:** add limit parameter to /styles request ([b23893e](https://github.com/VChet/StyleBase/commit/b23893e2ebd8ab1f4d2c6721787f1eda7e8789c4))
* **preview:** compress preview images via images.weserv.nl ([aa042d0](https://github.com/VChet/StyleBase/commit/aa042d02ac78639bdf69145b65dedc464d6c0673))


### Bug Fixes

* **emoji:** remove extra file extension ([4b6a60f](https://github.com/VChet/StyleBase/commit/4b6a60f1e02955ead3ec698cf859ca19751c7745))
* **images:** invert dark images in dark-theme ([5c68f79](https://github.com/VChet/StyleBase/commit/5c68f79045223f79cae160173fed93708dd2682f))
* **style update:** output update result as string ([8f1877e](https://github.com/VChet/StyleBase/commit/8f1877eab827406aef47c175ff96861a2085bcb6))

## [4.3.0](https://github.com/VChet/StyleBase/compare/v4.2.2...v4.3.0) (2021-02-19)


### Features

* **style search:** add search by substring ([8b55132](https://github.com/VChet/StyleBase/commit/8b551325f567bde21fbecf26efab833bbef5bd42))


### Bug Fixes

* **sort options:** keep options while loading, decrease opacity ([33c5587](https://github.com/VChet/StyleBase/commit/33c5587a54dbfe9ce1814e5c7f0af885b7ac8411))
* **style search:** allow search only with query longer than 2 characters ([dd6a3d8](https://github.com/VChet/StyleBase/commit/dd6a3d82f8f16ddf99b116807568f61e4e995632))
* **styles:** fix style duplication ([7b200db](https://github.com/VChet/StyleBase/commit/7b200db80c9855da60e4d272134c74ab6e75cee3))

### [4.2.2](https://github.com/VChet/StyleBase/compare/v4.2.1...v4.2.2) (2021-02-14)


### Bug Fixes

* **User model:** add sparse parameter to ids ([5b90c6f](https://github.com/VChet/StyleBase/commit/5b90c6fa2ea9b17497bb12ba22f89dcdcdab92a5))

### [4.2.1](https://github.com/VChet/StyleBase/compare/v4.2.0...v4.2.1) (2021-02-11)


### Bug Fixes

* **add style:** add custom fields description ([dd6992a](https://github.com/VChet/StyleBase/commit/dd6992a8dfe011bbc7201be5be39293e29a961e0))
* **style grid:** throttle scroll, do not show skeleton on loaded cards ([2c08316](https://github.com/VChet/StyleBase/commit/2c08316eb5ec079f5edd5d47f57d9c40e47dbe82))

## [4.2.0](https://github.com/VChet/StyleBase/compare/v4.1.1...v4.2.0) (2021-02-01)


### Features

* **parser:** search usercss files in folders ([3b42951](https://github.com/VChet/StyleBase/commit/3b42951618df4cacd9926e87e503ee80c94e84ab))
* **parser:** search usercss files in subfolders ([d062a2b](https://github.com/VChet/StyleBase/commit/d062a2b410acc1f1f0f6d053fcbf3ac365ee72f8))


### Bug Fixes

* **User:** fix Codeberg organization name parsing ([8cdaa7c](https://github.com/VChet/StyleBase/commit/8cdaa7c7ab1428069f982e2e868047d80e25344e))

### [4.1.1](https://github.com/VChet/StyleBase/compare/v4.1.0...v4.1.1) (2021-01-29)


### Bug Fixes

* **auth:** fix codeberg login ([ad265fe](https://github.com/VChet/StyleBase/commit/ad265feee88df1a05e3c841b8728eee85b2ff062))
* **style card:** open style dialog by clicking anywhere on the card ([54c7077](https://github.com/VChet/StyleBase/commit/54c7077c91abcbdc691868ff4827e6ce8c0e3766))

## [4.1.0](https://github.com/VChet/StyleBase/compare/v4.0.1...v4.1.0) (2021-01-15)


### Features

* **meta:** change title and description in different states ([85893bc](https://github.com/VChet/StyleBase/commit/85893bcce37cd2698df79c1b63e98b5dffb50619))
* **search:** add search by query with active owner filter ([45e0ddd](https://github.com/VChet/StyleBase/commit/45e0ddd592565aa9357f3a7c19cda20a250441f3))


### Bug Fixes

* **seo:** disallow "/search/" in robots.txt ([c93ee5d](https://github.com/VChet/StyleBase/commit/c93ee5d09f2c5ae4ddcffda1614e63b0e6ed6006))
* **url:** correctly set URL when closing a modal with active filters ([a459df5](https://github.com/VChet/StyleBase/commit/a459df50cc8c902cedafb979950396530018fcdb))

### [4.0.1](https://github.com/VChet/StyleBase/compare/v4.0.0...v4.0.1) (2021-01-11)


### Bug Fixes

* **auth:** store username instead of displayName ([f3c73a5](https://github.com/VChet/StyleBase/commit/f3c73a5808e9e5a5f227aa8d9239aa40177eb56c))
* **session:** keep user logged in ([d3cbd63](https://github.com/VChet/StyleBase/commit/d3cbd63892dc98578435e1e9953e76bb97467e05))
* **style card:** add gap between "stars" and "last update" blocks ([ce45e87](https://github.com/VChet/StyleBase/commit/ce45e8720cb582a34789efd2876a6e8064ca6f3d))
* **style card:** replace text with emojis ([9e4cf64](https://github.com/VChet/StyleBase/commit/9e4cf649cbcb7189ae533bc5d0e6689e658fa642))

## [4.0.0](https://github.com/VChet/StyleBase/compare/v3.5.0...v4.0.0) (2021-01-07)


### ⚠ BREAKING CHANGES

* **styles:** URL's for styles and users have changed.
New style URL: stylebase.cc/style/%url%
New user URL: stylebase.cc/user/%username%

### Features

* **styles:** add styleId field to be used in style url ([9ebb722](https://github.com/VChet/StyleBase/commit/9ebb722cdf3be6d45e1aab1312492bdfffcec030))


### Bug Fixes

* **favicon:** optimize svg ([9523220](https://github.com/VChet/StyleBase/commit/952322076caf69c1a82d89b4732d4c6f66a38e76))
* **parser:** store original style name ([e1d8ecc](https://github.com/VChet/StyleBase/commit/e1d8ecc21d66f69a74171974f97647f18fb6da8d))
* **style card:** show original style name ([a8f9e06](https://github.com/VChet/StyleBase/commit/a8f9e06d3e4cac9957bad66f76227f66eca21589))

## [3.5.0](https://github.com/VChet/StyleBase/compare/v3.4.1...v3.5.0) (2021-01-03)

### Features

* TypeScript support for server

### Bug Fixes

* **dialogs:** update titles and paddings ([377fc6e](https://github.com/VChet/StyleBase/commit/377fc6e61eccb946c3172f4499f31df9a84d9705))
* **favicon:** optimize svg ([145fdda](https://github.com/VChet/StyleBase/commit/145fddaac22a56aac36c942ea6846ab0fa299de0))
* **favicon:** remove legacy icons  ([38d9a61](https://github.com/VChet/StyleBase/commit/38d9a61452e478038c324f5a12e1964aa2c99550))
* **filter:** do not request all styles when the owner filter is active ([e118225](https://github.com/VChet/StyleBase/commit/e11822561be97dff1a7648fd05baeb3b97921563))
* **HowToUse:** update texts ([f742e79](https://github.com/VChet/StyleBase/commit/f742e79ab4a5c051298ab49d75cb6cdb13c5f5e9))
* **parser:** throw and catch metadata parser errors ([6f44ab2](https://github.com/VChet/StyleBase/commit/6f44ab2bd1ead4926d861d273d5d40420cb187df))
* **style card:** truncate name that's longer than 2 lines ([5845bec](https://github.com/VChet/StyleBase/commit/5845bec6ea337e230b0889cc1705dbc690d20114))

### [3.4.1](https://github.com/VChet/StyleBase/compare/v3.4.0...v3.4.1) (2020-12-27)


### Bug Fixes

* **alert:** support multiple alerts ([7e8f6f7](https://github.com/VChet/StyleBase/commit/7e8f6f718e4adc37c8e85d2287d5abb26455719f))
* **helmet:** add data URL to script-src directive ([37ceb3f](https://github.com/VChet/StyleBase/commit/37ceb3fe33b57897c013ecd50461b61c08f528ed))
* **parser:** do not replace parentheses in style name ([842b64b](https://github.com/VChet/StyleBase/commit/842b64bb21e3b2c720a1a66c3f49fa000ddde0a1))

## [3.4.0](https://github.com/VChet/StyleBase/compare/v3.3.0...v3.4.0) (2020-12-27)


### Features

* **parser:** fill style name, description, license from metadata ([efc6e07](https://github.com/VChet/StyleBase/commit/efc6e07b6b43c8e7025aa55cdbeaa89e389bf162))


### Bug Fixes

* **database:** fix owner id being stored as string instead of number ([c060cf0](https://github.com/VChet/StyleBase/commit/c060cf065a27f20ad7b7313e15e52623a0cd9df2))
* **features:** update texts ([f302361](https://github.com/VChet/StyleBase/commit/f302361d4a8702d19e3b3778c56d6fea26626a93))
* **login:** add authorization information ([e5fe070](https://github.com/VChet/StyleBase/commit/e5fe070cf0d94ed293d9324c36ad3acffb326133))
* **rss:** add RSS feed link in the head tag ([3536e92](https://github.com/VChet/StyleBase/commit/3536e92f1ac632d85b0c71dcc48a563a4f50f78d))
* **server:** remove Access-Control-Allow-Origin header ([b05eca6](https://github.com/VChet/StyleBase/commit/b05eca6792422e9065e60f630c5d94fdc1334c2c))
* **style edit:** fix user organizations check ([e1cd00c](https://github.com/VChet/StyleBase/commit/e1cd00cae733f0f0a3ffd6544453522938f0a6ab))
* **style update:** update style with metadata in scheduled update ([0c522e7](https://github.com/VChet/StyleBase/commit/0c522e75bb605e4c5df2911d602714346a81f052))
* **styles:** rearrange sort options, set 'most liked' as default ([bd553fc](https://github.com/VChet/StyleBase/commit/bd553fc569c63d5b389954e2d948bcf93abc5e09))
* **styles:** set initial sort order after filter reset ([4372346](https://github.com/VChet/StyleBase/commit/437234666c623fed18d761f48e4a8f737bd86724))

## [3.3.0](https://github.com/VChet/StyleBase/compare/v3.2.1...v3.3.0) (2020-12-17)


### Features

* **dark mode:** add dark theme and system theme detection ([e103613](https://github.com/VChet/StyleBase/commit/e103613243443624013181925c8376a5bb2acdf9))


### Bug Fixes

* **dark mode:** add ARIA attributes to switcher ([23bf2fa](https://github.com/VChet/StyleBase/commit/23bf2fa105b224e68f262bd47c040c652361b5f4))
* **styles:** show fetch errors in snackbar ([001c664](https://github.com/VChet/StyleBase/commit/001c66413f2963dc01f0b864e8d91ae069d6d04e))
* update color scheme and 'no-preview' image ([5233b77](https://github.com/VChet/StyleBase/commit/5233b77164df697d95c9c9a56a70dd60fd22d4d1))

### [3.2.1](https://github.com/VChet/StyleBase/compare/v3.2.0...v3.2.1) (2020-12-16)


### Bug Fixes

* **close button:** increase lines width ([376b335](https://github.com/VChet/StyleBase/commit/376b335db7afba23500ce198009555f42da189d2))
* **feature block:** fix border-width ([b8c1fd0](https://github.com/VChet/StyleBase/commit/b8c1fd03ca77f02c7664014c385122b1d3965479))
* **header:** clear filters on logo click ([e15825e](https://github.com/VChet/StyleBase/commit/e15825ef35843a51c8a970892b6ff7344e50d0c4))

## [3.2.0](https://github.com/VChet/StyleBase/compare/v3.1.1...v3.2.0) (2020-12-15)


### Features

* **add style:** set custom fields before submitting a style ([b408ab5](https://github.com/VChet/StyleBase/commit/b408ab5916ee7e3e8b65ba02a3605f08fe129156))


### Bug Fixes

* **custom fields:** fix old values rewriting ([06b4175](https://github.com/VChet/StyleBase/commit/06b4175532810b6b8e3b7c7b878c3d25f65cd1a5))
* **custom preview:** disallow icns, ico, sketch extensions ([a54719f](https://github.com/VChet/StyleBase/commit/a54719f5822193255c7f47814859f8e7079898a7))
* **style grid:** fetch style list on a style update ([cf0b3a4](https://github.com/VChet/StyleBase/commit/cf0b3a4f856c2733bdf1a473bf60a83962e639b5))
* **style update:** skip failed requests and update other styles ([08b3db8](https://github.com/VChet/StyleBase/commit/08b3db89300b424316ee3c16059a64090d4b3716))
* **styles api:** change 'edit style' request method to patch ([698b239](https://github.com/VChet/StyleBase/commit/698b2396dcfb28e7746faca81d49f01d53ee38ff))

### [3.1.1](https://github.com/VChet/StyleBase/compare/v3.1.0...v3.1.1) (2020-12-13)


### Bug Fixes

* **parser:** add repository name to parser errors ([e4c36ba](https://github.com/VChet/StyleBase/commit/e4c36baad6ff01cc6b58f0d0fd5fee97846abbdd))
* **style update:** convert style owner id value to string ([9b1c181](https://github.com/VChet/StyleBase/commit/9b1c1816e7d26d113255b299ebeecc68f1ed69c5))
* **user:** request organizations depending on a provider ([7a19bc4](https://github.com/VChet/StyleBase/commit/7a19bc4bc7afd47d2902e529d0f62f651f578735))

## [3.1.0](https://github.com/VChet/StyleBase/compare/v3.0.3...v3.1.0) (2020-12-13)


### Features

* **add style:** support codeberg.org repos ([730a5aa](https://github.com/VChet/StyleBase/commit/730a5aaa68189ba0c23d1b685b33e21588756504))
* **authentication:**  add gitea login strategy ([885ddcd](https://github.com/VChet/StyleBase/commit/885ddcd69033adb275b6a0f0f981d3c0d0d5b301))
* **login:** add dialog with login options ([47ffca7](https://github.com/VChet/StyleBase/commit/47ffca731ee9fdd9ea195e5d070ce167bc478a42))
* **parser:** support codeberg.org repos ([97fdee9](https://github.com/VChet/StyleBase/commit/97fdee91f8245efbe7438dac06cc607f3418c453))


### Bug Fixes

* **add style:** fix wrong parameters when looking for duplicates ([27675f0](https://github.com/VChet/StyleBase/commit/27675f0465f02dfcfbb3f28ee93ba17a09da2441))
* **authorization:** check owner by id instead of username ([5b921ec](https://github.com/VChet/StyleBase/commit/5b921ec8bb1b4c93d98dabf0d28ec47b0bacac95))
* **parser:** handle empty url, handle unsupported hosting providers ([caddb9a](https://github.com/VChet/StyleBase/commit/caddb9a143a53ea1673d77cff244875f873b03ae))
* **style card:** capitalize first letters of a style name ([4dfbc40](https://github.com/VChet/StyleBase/commit/4dfbc408ed5fbefd24626958adc8cfc1cafff283))
* **user model:** fix creating new user with codeberg id ([ad7f2e3](https://github.com/VChet/StyleBase/commit/ad7f2e39f35ae653e947abc4bd1c454701d75f81))

### [3.0.3](https://github.com/VChet/StyleBase/compare/v3.0.2...v3.0.3) (2020-12-09)


### Bug Fixes

* **style update:** fix passing wrong argument to the parser ([a1a823b](https://github.com/VChet/StyleBase/commit/a1a823b14faabbc270b24b5ebcfa2acd67ef5d9b))

### [3.0.2](https://github.com/VChet/StyleBase/compare/v3.0.1...v3.0.2) (2020-12-09)


### Bug Fixes

* **robots.txt:** disallow /login and /logout urls ([e0a4496](https://github.com/VChet/StyleBase/commit/e0a4496e7c936f5e298f6aa470a77f03adcc2baf))
* **style model:** convert style name to lowercase ([4ef38ff](https://github.com/VChet/StyleBase/commit/4ef38ff6bfd2c94e212b25a06810071fc7a86bc3))

### [3.0.1](https://github.com/VChet/StyleBase/compare/v3.0.0...v3.0.1) (2020-12-06)


### Bug Fixes

* **alerts:** show custom style name in add/update/delete notifications ([adcbcbd](https://github.com/VChet/StyleBase/commit/adcbcbd36597dc04a2ef099abb25d905183cd27c))

## [3.0.0](https://github.com/VChet/StyleBase/compare/v2.2.1...v3.0.0) (2020-12-04)


### ⚠ BREAKING CHANGES

* **styles api:** to select style which you want to edit/delete/update pass it's _id (was url)

### Features

* **style model:** remove unique flag from repository, add flag to style ([b272b1d](https://github.com/VChet/StyleBase/commit/b272b1d5f55d6bc02299a4fc1fd2a76ad80d08ca))
* **styles:** add style file selection ([eae1d73](https://github.com/VChet/StyleBase/commit/eae1d739d2dbdda878198b205e3e8ce5f5fd3169))
* **styles api:** add 'custom description' field ([e42bd82](https://github.com/VChet/StyleBase/commit/e42bd823afa2fd29d01145ac38302f8b9fef6a16))


### Bug Fixes

* **parser:** save style name without file extension ([1ab4111](https://github.com/VChet/StyleBase/commit/1ab4111ad47b06ccae7d16f826bf3bc563871821))
* **styles api:** edit/delete/update styles using _id field ([f55fbb5](https://github.com/VChet/StyleBase/commit/f55fbb53d62749d23dbb872e4749d940007eee6e))

### [2.2.1](https://github.com/VChet/StyleBase/compare/v2.2.0...v2.2.1) (2020-11-30)


### Bug Fixes

* **add style:** trim trailing slash from url ([74adde3](https://github.com/VChet/StyleBase/commit/74adde38afdad0bdb30a5a9aadeb4ed026dfb79c))
* **footer:** fix footer to the bottom of page on desktop and tablets ([cc81131](https://github.com/VChet/StyleBase/commit/cc81131d38a9e98e282b167235dd990150ac6022))

## [2.2.0](https://github.com/VChet/StyleBase/compare/v2.1.0...v2.2.0) (2020-11-27)


### Features

* **rss:** add rss generation ([0438e9c](https://github.com/VChet/StyleBase/commit/0438e9c3d76b1b5bc90dfd6c745a5484f034a3c4))
* **rss:** add rss link to footer ([4b1da26](https://github.com/VChet/StyleBase/commit/4b1da26c6cd51dcd8f65dc0f647aa5418dc5ec87))


### Bug Fixes

* **footer:** increase links font size and paddings in footer on mobile ([2b7302c](https://github.com/VChet/StyleBase/commit/2b7302c238b994db0afb7f43ee98d1ecc8b345d6))

## [2.1.0](https://github.com/VChet/StyleBase/compare/v2.0.1...v2.1.0) (2020-11-22)


### Features

* **alert:** add alert snackbar ([6dfb1ce](https://github.com/VChet/StyleBase/commit/6dfb1ce62fe23f549adbe41987f7f8ae7017930c))
* **authorization:** allow organization members to edit repositories ([2e8afb0](https://github.com/VChet/StyleBase/commit/2e8afb054167ddac2b74b95712e3b1fd4df7e190))
* **confirmation:** add confirmation dialog component ([ae03ddc](https://github.com/VChet/StyleBase/commit/ae03ddc0946d3235c732babc6d8ff633dc3df502))
* **style info:** add Twitter share button ([5640879](https://github.com/VChet/StyleBase/commit/564087947ca6bd2537a669f2293dfb51067ecd1a))
* **style info:** ask for confirmation before deleting a style ([762e4ff](https://github.com/VChet/StyleBase/commit/762e4ffe9845bd6e6c1c8a6ece7dd661f4454473))
* **user:** store user organizations ([b96a624](https://github.com/VChet/StyleBase/commit/b96a624c9741739b99c1f3387281f0aeae7cfa30))


### Bug Fixes

* **authentication:** remove scope to access only public data ([14e60da](https://github.com/VChet/StyleBase/commit/14e60da6e00ea70d520735ccb5f761d8ae6dbe92))
* **authorization:** handle empty user ([8fffddf](https://github.com/VChet/StyleBase/commit/8fffddff536abdf0f4a4d2aabe174041e96c9d7a))
* **user model:** set empty orgs array by default ([28a1032](https://github.com/VChet/StyleBase/commit/28a10325a353a35ffea213abacc1ad5af0cfb772))

### [2.0.1](https://github.com/VChet/StyleBase/compare/v2.0.0...v2.0.1) (2020-11-17)


### Bug Fixes

* **db:** send code and name on save error ([25cf268](https://github.com/VChet/StyleBase/commit/25cf26852e2683610de33505f284de803aa2fbce))
* **style info:** fix actions on style removal ([2b909c1](https://github.com/VChet/StyleBase/commit/2b909c14b3ded73ef8ffc7ca67c7f1d49e90cc17))
* fix dialog component names ([e04f767](https://github.com/VChet/StyleBase/commit/e04f76724e743fb514e9e6455ff85d75101c73da))

## [2.0.0](https://github.com/VChet/StyleBase/compare/v1.8.0...v2.0.0) (2020-11-14)


### ⚠ BREAKING CHANGES

* endpoint for styles by specific owner is changed from 'api/owner/:owner' to 'api/styles/:owner'
* endpoint for styles filtered by query is removed ('api/search/'). Now use 'api/styles/' with the 'query' GET parameter

### Features

* **parser:** support '.user.styl' files ([f7dd9aa](https://github.com/VChet/StyleBase/commit/f7dd9aa5043b0baedb3074d70dccf599ad8f44f6))
* **styles:** add sorting for styles filtered by query and by owner ([df46ecc](https://github.com/VChet/StyleBase/commit/df46ecc15459557b427e0ee99d2d7c98e9e86df6))
* **vuex:** add vuex, styles and user states, mutations, actions ([a036be5](https://github.com/VChet/StyleBase/commit/a036be5f43d43e99f7919f248cd58e1218c7f759))


### Bug Fixes

* **no script:** add styles for no-script block ([9b05746](https://github.com/VChet/StyleBase/commit/9b05746239811bd0da25c5d66e251afdf635fce8))
* **search:** change debounce behavior ([a7c1fc0](https://github.com/VChet/StyleBase/commit/a7c1fc0a31975315f045e00a514ffd758ef319d6))
* **search:** clear timeout on reset ([fd408c3](https://github.com/VChet/StyleBase/commit/fd408c3af3a1f3c302d31cb5454af80a3dfc306a))
* **sort order:** disable sort buttons on loading ([5651789](https://github.com/VChet/StyleBase/commit/565178905ac20551c9936d6e1a6621443b2757d2))
* **sort order:** hide sort order if only one style found ([4733f24](https://github.com/VChet/StyleBase/commit/4733f24a4e92f1467cca560ec2abf3d87648eb05))
* **styles api:** add lean parameter ([6713392](https://github.com/VChet/StyleBase/commit/6713392c5a387953ad007c8b10e55fc344600038))
* **styles api:** allow empty custom name and custom preview fields ([e154638](https://github.com/VChet/StyleBase/commit/e154638f91b66598916242a13ef009b313a3c7d6))
* **styles api:** check custom preview file extension ([a197043](https://github.com/VChet/StyleBase/commit/a19704335203e168d85a549aa38e1b9d5281815b))
* **vuex:** close modal window only if opened ([0033769](https://github.com/VChet/StyleBase/commit/0033769843ba44e26e879e1a60020d0ef0a28135))
* **vuex:** set search query even if it's empty ([8b32947](https://github.com/VChet/StyleBase/commit/8b32947df35b0fe5f8cc28df9e4ef86eea76ec0d))


* refactor!(styles api): use same function for query and owner search ([b39ffc5](https://github.com/VChet/StyleBase/commit/b39ffc5ca52436997624d5a1c596d5fa0b401631))

## [1.8.0](https://github.com/VChet/StyleBase/compare/v1.7.0...v1.8.0) (2020-10-31)


### Features

* **components:** add BaseCard component ([bbc8807](https://github.com/VChet/StyleBase/commit/bbc880768c9e654b451a7572f1358a1e74805875))
* **components:** update StyleCard and StyleCardSkeleton ([2eb0ed0](https://github.com/VChet/StyleBase/commit/2eb0ed03d90bedc58bb6eeda6af7be75bf35f2a5))
* **Components:** add skeleton loader component for StyleCard ([10f4321](https://github.com/VChet/StyleBase/commit/10f43216f71494c8ff96de6fdd2572bf1398a95e))
* **recaptcha:** use rate-limiter instead of recaptcha ([075ddbe](https://github.com/VChet/StyleBase/commit/075ddbe14d23d2467ee2ac05b15b08ef55f0a4bf))
* **style card:** change skeleton animation ([1270691](https://github.com/VChet/StyleBase/commit/1270691e3369fefd95ac60f2029961f5f3833d52))
* **style info:** add button to delete the style ([11e1bb6](https://github.com/VChet/StyleBase/commit/11e1bb64d6fd7ffd36093a9c2512e305de6251c4))


### Bug Fixes

* **helmet:** remove google recaptcha from csp ([6d2e37d](https://github.com/VChet/StyleBase/commit/6d2e37d8fd7e2ffe5a0e3b1e48bb99a5a705b77c))
* **style grid:** set skeleton cards amount depending on the current page ([27f33d8](https://github.com/VChet/StyleBase/commit/27f33d8e99c313f96c0b1e9e17396273835b2711))
* **style info:** handle submit via form ([8b6780a](https://github.com/VChet/StyleBase/commit/8b6780a9c2cb5a037dc40e87877471a973428a54))
* **styles api:** fix url parameters in update and delete requests ([959570c](https://github.com/VChet/StyleBase/commit/959570c114ea431c3ba74c9d2e8ea3dddcf754b1))
* **vue config:** add login and logout urls to devServer proxy ([d9e7a16](https://github.com/VChet/StyleBase/commit/d9e7a16e8a129f9bc6a993b94993ddee3ab0cfa4))
* **vue-loader:** preserve whitespace ([61566f1](https://github.com/VChet/StyleBase/commit/61566f1cbbcc3e891058ca3dac2bf296910caa1d))

## [1.7.0](https://github.com/VChet/StyleBase/compare/v1.6.0...v1.7.0) (2020-10-17)


### Features

* add logout button ([be178f4](https://github.com/VChet/StyleBase/commit/be178f492cc7b967a44e7d8314b9c7e4d839181f))


### Bug Fixes

* **buttons:** add types and aria-labels ([c83fea0](https://github.com/VChet/StyleBase/commit/c83fea032a90ad3b704211f8ca8383a8204eca7a))
* **style info:** add alternative text to image ([401fb94](https://github.com/VChet/StyleBase/commit/401fb9454fa8d54520fad759d5edd3dd05909da3))
* **style info:** fix mobile styles ([2380dd5](https://github.com/VChet/StyleBase/commit/2380dd529b130334efb8d4b4017c45f360c864b8))

## [1.6.0](https://github.com/VChet/StyleBase/compare/v1.5.0...v1.6.0) (2020-10-15)


### Features

* **parser:** add mercy-preview header ([a121495](https://github.com/VChet/StyleBase/commit/a12149562de37a19f534b8c0456c3f5f304bef9c))
* **style info:** add search by topic ([231f750](https://github.com/VChet/StyleBase/commit/231f750fd6b9643888f8ce774bab6eeb4220f098))
* **style info:** add topics block ([162d927](https://github.com/VChet/StyleBase/commit/162d9278d38006882166262bffd77d82cc180148))
* **styles:** store topics in DB ([f46a996](https://github.com/VChet/StyleBase/commit/f46a99621bb5ba40da22ecbf4fa3e10deaa6f8e4))

## [1.5.0](https://github.com/VChet/StyleBase/compare/v1.4.0...v1.5.0) (2020-10-13)


### Features

* **login:** add login button and user session check ([cf17bc6](https://github.com/VChet/StyleBase/commit/cf17bc61c5d266a93c7cd0a890d8618a38675b41))
* **Style:** add 'edit style' request and custom fields ([fe3b347](https://github.com/VChet/StyleBase/commit/fe3b3470539b4b6d2126f469635fdf825867950b))
* **style card:** use manually added title and preview ([b49ad47](https://github.com/VChet/StyleBase/commit/b49ad47cf51ca07410de34a6d6f7dc6ec0aa6ae4))
* **style info:** add "edit style" block ([a95cc8d](https://github.com/VChet/StyleBase/commit/a95cc8d7ef00fd1bc09b592b614092140add0298))


### Bug Fixes

* **add style:** move disabled state from exit button to submit button ([9af0285](https://github.com/VChet/StyleBase/commit/9af0285c6fd5865a342c2b21e2f62fd6514a3451))
* **analytics:** set correct page path ([a075166](https://github.com/VChet/StyleBase/commit/a075166b8cb6a0aad0ae0ddae55e41da547c9620))
* **authentication:** change scope from email to profile data ([63b170d](https://github.com/VChet/StyleBase/commit/63b170dde08d5b65d26a1351c18e15933c35ce42))
* **buttons:** set width and height globally, add mobile styles ([4b31241](https://github.com/VChet/StyleBase/commit/4b31241435c9155f7a54bcd0d9f807f4980402fd))
* **edit style:** add custom preview protocol check ([9b9d46f](https://github.com/VChet/StyleBase/commit/9b9d46f71b19524840cd7ce420d7e19409eda9cb))
* **edit style:** allow owner to edit the style ([2bd833e](https://github.com/VChet/StyleBase/commit/2bd833e3837c0308872c36b14e0a24302b0669e7))
* **edit style:** clear cache on style edit and delete ([599891e](https://github.com/VChet/StyleBase/commit/599891ede90003fa277b636e491b813650878fcf))
* **edit style:** update only customName and customPreview fields ([944c6e9](https://github.com/VChet/StyleBase/commit/944c6e90fccc36fc0e69fe8ee17a0259e81150d4))
* **helmet:** allow images from any secure source ([1fa889b](https://github.com/VChet/StyleBase/commit/1fa889bafaf955b4c3bdd49ddcc4c57e44f85675))
* **update style:** use url instead of _id to update style ([be1cc0f](https://github.com/VChet/StyleBase/commit/be1cc0fb7d155863a330a41637e778a47dace25e))

## [1.4.0](https://github.com/VChet/StyleBase/compare/v1.3.1...v1.4.0) (2020-10-10)


### Features

* **header:** add burger menu ([a8dc3a6](https://github.com/VChet/StyleBase/commit/a8dc3a693d21b61ebf9fb770beb6057fb9416d1f))


### Bug Fixes

* **helmet:** add githubassets.com to img-src CSP ([fde5008](https://github.com/VChet/StyleBase/commit/fde5008ebe3eea2771d00b28c20eccfa56bf1cbe))
* make "b" uppercase in the site name ([a5eee88](https://github.com/VChet/StyleBase/commit/a5eee886b715669a73403d52045811ff522aa78c))
* **helmet:** add data scheme to img-src CSP ([c3485dc](https://github.com/VChet/StyleBase/commit/c3485dc25931da392264622dbd93e76a395ca36a))
* **styles:** add margin to title on mobile ([b9da67c](https://github.com/VChet/StyleBase/commit/b9da67ccdc0204c014e5420b37c16bfcee51d0f6))

### [1.3.1](https://github.com/VChet/StyleBase/compare/v1.3.0...v1.3.1) (2020-10-08)


### Bug Fixes

* **parser:** add error status and text fields ([6349c5a](https://github.com/VChet/StyleBase/commit/6349c5a84ed56eaf983de1b36802ba16747e567a))
* **parser:** set default branch ([6d41942](https://github.com/VChet/StyleBase/commit/6d4194290ddc6265070f75975134ea5035449ade))
* **rate limiter:** send error message as object ([be6f2fc](https://github.com/VChet/StyleBase/commit/be6f2fcb7bc83485b9df45511faeca795ae5bb61))
* **routes:** disable middleware checks on non production environment ([3f65f15](https://github.com/VChet/StyleBase/commit/3f65f155f8fafa709ae0046da2fd6ce1954ad2c4))
* **style info:** restore no-scroll class in body when modal is active ([62863f7](https://github.com/VChet/StyleBase/commit/62863f74122832004e04ea6591104070a57f6a2c))

## [1.3.0](https://github.com/VChet/StyleBase/compare/v1.2.0...v1.3.0) (2020-10-07)


### Features

* **footer:** add contact email ([0277f51](https://github.com/VChet/StyleBase/commit/0277f515de349f93b2f2104497dd38f754ae3f37))
* **privacy policy:** add privacy policy popup ([480b0dc](https://github.com/VChet/StyleBase/commit/480b0dc6eb51a0c77572814059589eea7b197073))


### Bug Fixes

* **header:** scroll to top on logo click ([b001569](https://github.com/VChet/StyleBase/commit/b0015691a34cb5a372fc72d5b8076e61e1be2995))
* **style card:** add image for empty preview ([f6775b3](https://github.com/VChet/StyleBase/commit/f6775b304648c7f49e9933a6091a2d4cbc2121b0))
* set document title when changing history state ([c6c608a](https://github.com/VChet/StyleBase/commit/c6c608a1acfc01b7faa6bd235418d300ade841a8))

## [1.2.0](https://github.com/VChet/StyleBase/compare/v1.1.1...v1.2.0) (2020-10-04)


### Features

* **analytics:** add events for StyleCard and AddStyleDialog ([0dd1abb](https://github.com/VChet/StyleBase/commit/0dd1abba65889aa1e7f5296ee58735f3e09e4239))
* support site search in omnibox ([d801c51](https://github.com/VChet/StyleBase/commit/d801c51991d7ef5f3f047306510af0349d9ca4cc))


### Bug Fixes

* **agenda:** remove condition when agenda stops ([2c5e5d7](https://github.com/VChet/StyleBase/commit/2c5e5d7d7465d47e6c36a549cd58e5c4abe2d2f7))
* **parser:** prioritize image with "preview" in file name ([620bfd6](https://github.com/VChet/StyleBase/commit/620bfd6c734a286b0b5453dff7d09952de7bf89e))
* **style card:** cut long names ([683b300](https://github.com/VChet/StyleBase/commit/683b300cd540541789daa7041a523b14c15e5328))
* **style info:** add mixin to replace dash and underscore in style name ([179c058](https://github.com/VChet/StyleBase/commit/179c0581db932d6f40ff6df6e80e0b8fa5e952f0))
* **style info:** parse and replace emojis in description ([45dc100](https://github.com/VChet/StyleBase/commit/45dc1009e80785d6d8c789536dbdf8c59865434a))
* **style info:** update links ([021a073](https://github.com/VChet/StyleBase/commit/021a073f5670c65c3025abffddee438d4986e0f8))

### [1.1.1](https://github.com/VChet/StyleBase/compare/v1.1.0...v1.1.1) (2020-10-03)


### Bug Fixes

* **add style:** fix style name in successful response ([d4e5e91](https://github.com/VChet/StyleBase/commit/d4e5e91624be160b1a0a693c0e9e9089528e20c5))
* **search bar:** change placeholder text ([fa52b64](https://github.com/VChet/StyleBase/commit/fa52b647f4377e4aecb80c34e6f39abc63158759))

## [1.1.0](https://github.com/VChet/StyleBase/compare/v1.0.0...v1.1.0) (2020-10-03)


### Features

* **Home:** add owner filter to url ([dd421db](https://github.com/VChet/StyleBase/commit/dd421db992558555b65673ba1c347e8131b4b84f))
* **search:** add search query to url ([a9cff70](https://github.com/VChet/StyleBase/commit/a9cff70a330f924a66514f2ba6ec7441da507a44))
* **server:** add maintenance page ([721ec68](https://github.com/VChet/StyleBase/commit/721ec68f75966ce17660ad59273bc60f6c45aed5))
* **style info:** open style popup with data from url ([0d801fa](https://github.com/VChet/StyleBase/commit/0d801fa32b9314e117eec545631e8a9bed409b2f))
* **style popup:** add owner and style name to url ([3b7f4a8](https://github.com/VChet/StyleBase/commit/3b7f4a829db680564032ce666a6095af927936cc))


### Bug Fixes

* **add style:** show clear button only with text ([422125d](https://github.com/VChet/StyleBase/commit/422125da18a27e49a53c994289f704112f5ab9c9))
* **agenda:** stop agenda on non-production deployments ([fdfbdc6](https://github.com/VChet/StyleBase/commit/fdfbdc65afe26a90889d68e1211dfea9d0dd415f))
* **get style:** get style by owner and name instead of _id ([cdfcd45](https://github.com/VChet/StyleBase/commit/cdfcd452a4e36812e794634a761ed9a85f6b7343))
* **Home:** move container to component ([18bcdfe](https://github.com/VChet/StyleBase/commit/18bcdfe7063801113337cd54d445ab0ba12c003d))
* **parser:** store repo names with dashes, replace to spaces in view ([6136971](https://github.com/VChet/StyleBase/commit/6136971e98c23a06a4fabfa2728142c90ea56655))
* **sort options:** remove list margin, compensate bottom padding ([3aecb4c](https://github.com/VChet/StyleBase/commit/3aecb4c82e59945a922f82d48f538d1e20bb200d))
* **style grid:** make grid fill all available space ([4848482](https://github.com/VChet/StyleBase/commit/484848208277e96bb02a0758a63430a6152dd987))
* **style info:** make a separate request for style data ([9a87110](https://github.com/VChet/StyleBase/commit/9a871109c74b8c28f84e9d99ab4810abc575b86d))
* **url:** fix url when changing history state ([4ce6f49](https://github.com/VChet/StyleBase/commit/4ce6f49b6249c9b0b7ae89a467b4667c8b7b630a))

## 1.0.0 (2020-10-02)


### Features

* Initial release
