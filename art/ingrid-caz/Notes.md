# Notes

## CSS

Un noeud de la page est dessiné en fonction de 3 principales propriétés :

     - le margin (les marges extérieurs)
     - le border (la bordure)
     - le padding (les marges intérieures)

Exemple de CSS :
```css
div {
    margin:16px; /*16px en haut,bas,droite,gauche*/
    margin-top: 32px; /* override: 32px pour le haut UNIQUEMENT*/
    border: solid 8px purple;
    padding: 24px;
}
```