BEGIN;

INSERT INTO trails (
  name, url, "thumbUrl", length, "elevationGain", description
)

VALUES

(
  'Bierstadt'
  , 'https://www.14ers.com/route.php?route=bier1&peak=Mt.+Bierstadt'
  , 'https://www.14ers.com/photos/evansgroup/rt_bier1.jpg'
  , '7'
  , '2850'
  , 'Mount Bierstadt is a 14,065-foot-high mountain summit in the Front Range of the Rocky Mountains, in the U.S. state of Colorado. The fourteener is located in the Mount Evans Wilderness of Pike National Forest, 9.4 miles south by east of the Town of Georgetown in Clear Creek County.'
)

, (
  'Shavano'
  , 'https://www.14ers.com/route.php?route=shav1'
  , 'https://www.14ers.com/photos/shavanogroup/rt_shav1.jpg'
  , '9'
  , '4600'
  , 'Mount Shavano is a high mountain summit in the southern Sawatch Range of the Rocky Mountains of North America. The 14,231-foot fourteener is located in San Isabel National Forest, 6.5 miles north by west of the community of Maysville in Chaffee County, Colorado, United States.'
)

, (
  'Handies'
  , 'https://www.14ers.com/route.php?route=hand1'
  , 'https://www.14ers.com/photos/handiespeak/rt_hand1.jpg'
  , '7.5'
  , '2800'
  , 'Handies Peak is a high and prominent mountain summit of the San Juan Mountains range in the Rocky Mountains of North America.'
)

;