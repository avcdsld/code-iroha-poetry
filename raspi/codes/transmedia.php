<?php

class TransmediaStory {
    private $coreTheme;

    public function __construct($theme) {
        $this->coreTheme = $theme;
    }

    function transform($format) {
        return "Core: {$this->coreTheme}, " .
               "Reduced to: {$format}";
    }
}

$story = new TransmediaStory("Human Connection");
$story->transform("Just a Title");
$story->transform("Just a Visual");
$story->transform("Just a Hashtag");
