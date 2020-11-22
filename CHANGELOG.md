# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
