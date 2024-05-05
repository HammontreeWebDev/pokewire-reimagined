export default function typeColorSelector(typeName) {
    switch (typeName) {
        case 'bug':
            return 'bg-[var(--type-bug)] ring-[var(--type-bug)]-600/20';
            break;

        case 'dark':
            return 'bg-[var(--type-dark)] ring-[var(--type-dark)]-600/20';
            break;

        case 'dragon':
            return 'bg-[var(--type-dragon)] ring-[var(--type-dragon)]-600/20';
            break;

        case 'electric':
            return 'bg-[var(--type-electric)] ring-[var(--type-electric)]-600/20';
            break;

        case 'fairy':
            return 'bg-[var(--type-fairy)] ring-[var(--type-fairy)]-600/20';
            break;

        case 'fighting':
            return 'bg-[var(--type-fighting)] ring-[var(--type-fighting)]-600/20';
            break;

        case 'flying':
            return 'bg-[var(--type-flying)] ring-[var(--type-flying)]-600/20';
            break;

        case 'ghost':
            return 'bg-[var(--type-ghost)] ring-[var(--type-ghost)]-600/20';
            break;

        case 'grass':
            return 'bg-[var(--type-grass)] ring-[var(--type-grass)]-600/20';
            break;

        case 'ground':
            return 'bg-[var(--type-ground)] ring-[var(--type-ground)]-600/20';
            break;

        case 'fire':
            return 'bg-[var(--type-fire)] ring-[var(--type-fire)]-600/20';
            break;

        case 'ice':
            return 'bg-[var(--type-ice)] ring-[var(--type-ice)]-600/20';
            break;

        case 'normal':
            return 'bg-[var(--type-normal)] ring-[var(--type-normal)]-600/20';
            break;

        case 'poison':
            return 'bg-[var(--type-poison)] ring-[var(--type-poison)]-600/20';
            break;

        case 'psychic':
            return 'bg-[var(--type-psychic)] ring-[var(--type-psychic)]-600/20';
            break;

        case 'rock':
            return 'bg-[var(--type-rock)] ring-[var(--type-rock)]-600/20';
            break;

        case 'steel':
            return 'bg-[var(--type-steel)] ring-[var(--type-steel)]-600/20';
            break;

        case 'water':
            return 'bg-[var(--type-water)] ring-[var(--type-water)]-600/20';
            break;

        default:
            return 'bg-transparent';
    }
}