import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import ListIcon from 'shared/assets/icons/small.svg';
import TilesIcon from 'shared/assets/icons/tiles.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '../../model/types/article';

interface ArticleViewSwitcherProps {
    className?: string
    view: ArticleView,
    onViewClick: (view: ArticleView) => void
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: ListIcon,
    },
    {
        view: ArticleView.BIG,
        icon: TilesIcon,
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSwitcherProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <div className={classNames(cls.ArticleViewSwitcher, {}, [className])}>
            {
                viewTypes.map((viewType) => (
                    <Button
                        theme={ButtonTheme.CLEAR}
                        onClick={onClick(viewType.view)}
                    >
                        <Icon
                            Svg={viewType.icon}
                            className={classNames('', { [cls.notSelected]: viewType.view !== view })}
                        />
                    </Button>
                ))
            }
        </div>
    );
});
