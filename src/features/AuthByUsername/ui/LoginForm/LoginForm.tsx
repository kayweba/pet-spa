import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { memo, useCallback, useEffect } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getLoginUsername } from '../../selectors/getLoginUsername/getLoginUsername';
import { getLoginIsLoading } from '../../selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../selectors/getLoginError/getLoginError';
import { getLoginPassword } from '../../selectors/getLoginPassword/getLoginPassword';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, username, password]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text title={t('Форма авторизации')} />
                {error && <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />}
                <Input
                    onChange={onChangeUsername}
                    autofocus
                    placeholder={t('Введите логин')}
                    type="text"
                    className={cls.input}
                    value={username}
                />
                <Input
                    onChange={onChangePassword}
                    placeholder={t('Введите пароль')}
                    type="text"
                    className={cls.input}
                    value={password}
                />
                <Button
                    theme={ButtonTheme.OUTLINE}
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('Войти')}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
