YAMI KIDS + NUUMONSTERS DATA FOR THE YANOVERSE MULTI-DEX
For the "yano" folder of github.com/bbroadhead/dokidex.
Taken straight from the game projects:
  Yami Kids     project as of 2026-10-25 (project version 1.0.8.4)
  Nuumonsters   2026 Remake, project as of 2026-08-16


WHAT'S IN HERE
  yami-kids/     89 Oni
  nuumonsters/   71 Nuu

Each game folder copies the dokidex layout:
  _monsters/<slug>.md                         one per monster, same front matter as _dokimon/*.md
  _data/evolution_chains.yml                  same layout as _data/evolution_chains.yml
  _data/<game>.json                           every field in one file (easiest to script from)
  _data/<game>.csv                            the same, as a spreadsheet
  assets/images/<slug>.png                    front sprite at 5x, nearest-neighbour
  assets/images/mini_sprites/<slug>_mini.png  16x16 menu icon (same size as your minis)
  assets/images/native/<slug>.png             the front sprites at 1x, exact game pixels
  assets/images/forms/<number>_<slug>/<slug>_shiny.png
                                              Yami Kids only: the shiny palette at 5x
                                              (1x copies are in native/ as <slug>_shiny.png)

Sprite sizes: your Quest images are 56 px art at 5x (280x280). These use the same 5x:
Yami Kids art is 64 px -> 320x320, Nuumonsters art is 48 px -> 240x240.


COUNTS
  Yami Kids     89 monsters, 89 front sprites, 89 minis, 89 shinies
                43 evolution chains, stage 1 / 2 / 3: 41 / 38 / 10
  Nuumonsters   71 monsters, 71 front sprites, 71 minis
                no evolutions (every chain has one member), one type each


FRONT MATTER FIELDS (_monsters/*.md)
  number              dex number as the game shows it (NO. 001 = 1)
  name                English name
  stage               1-3, worked out from the evolution data
  evolves_at          level it evolves at, or null
  evolves_from        name or null (new field)
  evolves_to          list of names (new field; two names = random split, see below)
  type                Yami Kids: element + second element, e.g. [Inferno, Demon]
                      Nuumonsters: one type
  sin                 Yami Kids only: Pride, Greed, Lust, Envy, Gluttony, Wrath or Sloth
                      (the third icon on the in-game dex page)
  image               front sprite (5x)
  mini_sprite         16x16 icon
  shiny_image         Yami Kids only
  short_description   the line under the name in the in-game dex, e.g. "Young Vampire"
                      (no "Dokimon"-style word on the end)
  long_description    the dex entry
  base_stats          [HP, ATK, DEF, M.ATK, M.DEF, SPD], same order as your stat table and radar
                      (in game: Health, Attack, Defense, Mgk. Atk, Mgk. Def, Speed)
  game                "Yami Kids" or "Nuumonsters"
  lang_names, description   left empty, same as your files
  Not included: location, moves, translations, evo_chain_include.


IMAGE PATHS AND SLUGS
  Paths are written as /yano/<game>/assets/images/..., which works if this folder sits at
  /yano/ in the site root. Change the prefix if you move the images into /assets/images/.
  A slug is the name in lowercase with anything that isn't a letter or digit turned into "-":
  Dr. Dandy -> dr-dandy, Re:akako -> re-akako, Miyuki (Ascended) -> miyuki-ascended,
  Mr Puff -> mr-puff. Your templates build mini sprite paths from the name, so use the
  slug for these two games.


GOOD TO KNOW
  - Yami Kids has two random 50/50 split evolutions:
      #37 Kitama at Lv 24 -> #38 Shuten or #39 Asurama
      #61 Kajou at Lv 80  -> #62 Hinojou or #63 Sunato
    evolution_chains.yml lists each one as two chains.
  - Yami Kids levels go up to 200, so evolution levels over 100 (up to 160) are real.
  - Sprites face the way the in-game dex shows them; in battle the opponent is mirrored.
  - Nuumonsters prints the classification and dex entry in capitals; the files keep normal casing.
  - Text is copied from the games' English text files without edits. Stats are the
    current values and can change in a balance patch.
