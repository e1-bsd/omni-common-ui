import _Card from './Card';
import _Content from './Content';
import _Image from './Image';

export const Card = _Card;
export const Content = _Content;
export const Image = _Image;

Card.Content = Content;
Card.Image = Image;

export default Card;
