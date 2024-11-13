# YuGiBinder Write up

This is the place where most of the thoughts and ideas behind YuGiBinder are laid out, if you've got ideas open an issue, and let me know!

## Feature Request/Ideas

- Need To Add/Wishlist for binders
  - Say we have Dark Magician and Dark Magician girl, but need to add envoy black magician of chaos, we can add him to a wishlist/need to add list
- Ability to `like` a card
- Could we add `reactions` rather than just `likes`?
  - Potential Reactions:
    - Cool/Good
    - Like
    - Sad
    - Funny
  - The problem here is possibility of miscommunication, or bullying?
- Other language support
  - I know https://db.ygoresources.com/about/api offers multi language support for a lot of YGO card prints, might be worth looking into
    - This would require the implementation of vue-i18n and a total rewrite of a lot of the language on the app
    - But at the same time better to get ahead of it than anything right?
- Liked Binders
  - See all the binders you've liked
  - Maybe I make this into a filter?

## Binder Ideas

- Binders can hold X Amount of cards
  - Where X is a number I have not agreed upon yet
- Context menu on right click of a **YGO CARD** with the following options:
  - Move (Only available to Binder owner)
  - Delete (Only Available to Binder owner)
  - Add another (Only available to Binder owner)
  - Goto
- When left `clicking` a YGO card, it should slide into the main viewport with a dark overlay behind it and it should follow the mouse (similar to how we did floating card)
- When the user selects `move` they should be able to then drag and drop that YGO card
  - Moving the YGO card close to the left or right edge, the pagination should then automatically trigger and go to the next or previous page of the binder
    - This might be tricky to do, but will be a huge QOL win imo
- Animation effect: Have the cards slide left/right when changing the page
  - We could also do a page turner effect, but this will be significantly harder, and idk if that whole Amazon thing is cleared up yet

## Card Catalog

- We need to add sorting and filtering to the card catalog
  - Offer Sorting by: (\*: Is this possible?)
    - Name
    - Attack
    - Defense
    - Archetype(\*)
    - Level
    - Attribute
    - Race(\*)
  - Offer Filtering by: (\*: Is this possible?)
    - Race
    - Archetype
    - Name
    - Attack
    - Defense
    - Level
    - Attribute
    - Card Frame
    - Maybe others???
- We can probably make this filtering into a component, like a sidebar for reuse on the binders screen

## Single Card View

- Offers the floating card effect on the YGO Card
  - Should we allow them to click the card and then bring it front and center like on the `binder`?
- Show how many views the card has
- Box of listed stats, description, and other information
- Box of worth/prices (based on the ygoprodeck api since we don't have access to tcgplayers api)
- Good use of the `Splitter` UI from Radix-Vue
- Next section will be related cards
  - Can we build an algorithm that would allow non archetype related cards to show up?
    - See [Related Cards Algorithm](#related-cards-algorithm) Section for more discussion
  - For now we can rely on archetype
- Have a small list of Binders (maybe like 2 or 3?) this card is a part of
  - These should be sorted by views/popularity
- Have a banlist info section
- Display which formats the card is currently available in (TCG, OCG)
- Maybe a comments section if we get around to building one
- Maybe offer external links to TCGPlayer, Yugipedia, and db.ygoresources.com

## Comments

- I don't know if I want to allow comments in the app
- I like the idea of commenting and communication between users
- But comments are such a pain to moderate

## Related Cards Algorithm

We will need to write an algorithm that can relate YGO cards to other YGO cards not of the same archetype

- This could be through name (like on trap/spell cards)
- This could be through the cards effects (so its description)
- I'm not currently sure how to relate cards other than these 2 places

I'll write down more here as I make discoveries and get fed ideas about this algorithm

## Current Concerns/Gachas

- Adding cards might be tedious, we need the user to fill out the info such as: (Is there a better way to streamline this?)
  - Is it unlimited or first edition?
  - What is the rarity?
  - How many?
