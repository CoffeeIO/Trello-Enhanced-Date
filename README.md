# Trello-Enhanced-Date [![Codacy Badge](https://api.codacy.com/project/badge/grade/8e4aa286d21749aaae1edc72dd59f41f)](https://www.codacy.com/app/mgapcdev/Trello-Enhanced-Date)
Chrome Extension for making the Trello date reminder more customizable

## Usage
<h5>Days info</h5>
<p>The number of days indicates when the selected color should be used. A <b>positive number of days</b> is number of days after the deadline. A <b>negative number of days</b> (e.g. "-7") indicates number of days before the deadline.</p>
<h5>Colors info</h5>
<p>Colors are currently limited to <b>only hex colors</b>, as that's easy to write code for. The "#"(hash) character is currently required, so this will allow hex colors of 4 and 7 characters (e.g. #FFF and #FFFFFF)</p>
<p>If the is interest in support for RGB and named colors (e.g. light-blue), I'll look into implementing it.</p>
<h5>Language info</h5>
<p>Currently <b>only english is fully supported</b>. If there is interest in support for other language send a mail to <a href="mailto:mgapcdev@gmail.com" target="_top">mgapcdev@gmail.com</a> or submit an issue on the github page.</p>
<h5>Example 1</h5>
<img src="/examples/example1.PNG" class="img-responsive" alt="Responsive image">

## Installation

1. Download repo to local environment: `git clone https://github.com/MGApcDev/Trello-Enhanced-Date.git`
2. Open Google Chrome and go to `Menu`

![Chrome Menu](https://www.google.com/intl/en_us/homepage/images/dhp-step1-chrome-win.jpg)

3. Go to `"More tools" -> "Extensions"`
4. Click on `"Load unpacked extension..."`
5. Select the folder you downloaded the repo to
6. Now you can make changes to the project, remember to reload the extension when you make changes

## Contributions
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :smile:

## Credits

#### Bug and fixes

Observe dom changes :arrow_right: [MutationObserver](http://stackoverflow.com/a/11546242/2741279)

#### Image and icons
Color picker :arrow_right: [colorPicker](https://github.com/PitPik/colorPicker) by [PitPik](https://github.com/PitPik)

[Modified] Settings icon :arrow_right: Icons made by <a href="http://www.flaticon.com/authors/egor-rumyantsev" title="Egor Rumyantsev">Egor Rumyantsev</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>

Valid check icon :arrow_right: Icons made by <a href="http://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>

Invalid check icon :arrow_right: Icons made by <a href="http://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>

---
Copyright &copy; 2016 [Mathias Grundtvig Andreasen](https://github.com/MGApcDev) (MGApcDev). Licensed under the terms of the [MIT license](LICENSE.md).
