import {ReactComponent as Location} from "@/shared/assets/svg/Location.svg";
import {ReactComponent as Login} from "@/shared/assets/svg/Login.svg";
import {ReactComponent as Comparison} from "@/shared/assets/svg/Comparison.svg";
import {ReactComponent as Favorite} from "@/shared/assets/svg/Favorite.svg";
import {ReactComponent as Cart} from "@/shared/assets/svg/Cart.svg";
import {ReactComponent as Search} from "@/shared/assets/svg/Search.svg";
import {ReactComponent as Close} from "@/shared/assets/svg/Close.svg";
import {ReactComponent as ArrowDown} from "@/shared/assets/svg/ArrowDown.svg";
import {ReactComponent as Success} from "@/shared/assets/svg/Complete.svg";
import {ReactComponent as Can} from "@/shared/assets/svg/Can.svg";
import { ReactComponent as PassportOne } from '@/shared/assets/svg/personSvg.svg'
import { ReactComponent as PassportTwo } from '@/shared/assets/svg/personSvg2.svg'
import { ReactComponent as PassportThree } from '@/shared/assets/svg/personSvg3.svg'
import { ReactComponent as Check } from '@/shared/assets/svg/check.svg'
import { ReactComponent as Settings } from '@/shared/assets/svg/Settings.svg'
import { ReactComponent as List } from '@/shared/assets/svg/List.svg'
import { ReactComponent as Bag } from '@/shared/assets/svg/Bag.svg'
import { ReactComponent as Comment } from '@/shared/assets/svg/Comment.svg'
import { ReactComponent as ArrowLeft } from '@/shared/assets/svg/arrowLeft.svg'
import { ReactComponent as Eye } from '@/shared/assets/svg/eye.svg'
import { ReactComponent as AccordionArrow } from '@/shared/assets/svg/Arrows.svg'

import {newGuid} from "@/shared/lib/guid";

export enum IconType{
    LOCATION = "Location",
    LOGIN = "Login",
    COMPARISON = "Comparison",
    FAVORITE = "Favorite",
    CART = "Cart",
    SEARCH = "Search",
    CLOSE = "Close",
    ARROW_DOWN = "ArrowDown",
    SUCCESS = "Success",
    CAN = "Can",
    PASSPORT_ONE = "PassportOne",
    PASSPORT_TWO = "PassportTwo",
    PASSPORT_THREE = "PassportThree",
    CHECK = "Check",
    SETTINGS = "Settings",
    LIST = "List",
    BAG = "Bag",
    COMMENT = "Comment",
    ARROW_LEFT = "ArrowLeft",
    EYE = "Eye",
    ACCORDION_ARROW = "AccordionArrow",
}
export const icon = new Map([
    [IconType.LOCATION, <Location key={newGuid()} />],
    [IconType.LOGIN, <Login key={newGuid()} />],
    [IconType.COMPARISON, <Comparison key={newGuid()} />],
    [IconType.FAVORITE, <Favorite key={newGuid()} />],
    [IconType.CART, <Cart key={newGuid()} />],
    [IconType.SEARCH, <Search key={newGuid()} />],
    [IconType.CLOSE, <Close key={newGuid()} />],
    [IconType.ARROW_DOWN, <ArrowDown key={newGuid()} />],
    [IconType.SUCCESS, <Success key={newGuid()} />],
    [IconType.CAN, <Can key={newGuid()} />],
    [IconType.PASSPORT_ONE, <PassportOne key={newGuid()} />],
    [IconType.PASSPORT_TWO, <PassportTwo key={newGuid()} />],
    [IconType.PASSPORT_THREE, <PassportThree key={newGuid()} />],
    [IconType.CHECK, <Check key={newGuid()} />],
    [IconType.SETTINGS, <Settings key={newGuid()} />],
    [IconType.LIST, <List key={newGuid()} />],
    [IconType.BAG, <Bag key={newGuid()} />],
    [IconType.COMMENT, <Comment key={newGuid()} />],
    [IconType.ARROW_LEFT, <ArrowLeft key={newGuid()} />],
    [IconType.EYE, <Eye key={newGuid()} />],
    [IconType.ACCORDION_ARROW, <AccordionArrow key={newGuid()} />],
])