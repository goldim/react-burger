import { Button, Input } from '../utils/yandex-components';
import { updateProfile } from '../services/middleware/auth';
import { FormEvent } from 'react';
import { useDispatch } from '../services/hooks';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { getProfile } from '../services/middleware/auth';
import { useAuth } from '../services/auth';

import styles from './common.module.css';

const ProfileSettingsPage = () => {
    const auth = useAuth();
    const user = auth.user;
    const savedName = user ? user.name : "";
    const savedEmail = user ? user.email : "";
    const reduxDispatch = useDispatch();
  
    const [name, setName] = useState<string>(savedName);
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
    }
  
    const [password, setPassword] = useState("");
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
    }
  
    const [email, setEmail] = useState(savedEmail);
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
    }
  
    const setupFields = useCallback(() => {
      setName(name);
      setPassword(password);
      setEmail(email);
    }, [name, password, email])
    
    const resetFields = useCallback(() => {
      setName(savedName);
      setPassword(password);
      setEmail(savedEmail);
    }, [savedName, password, savedEmail])
  
    const onCancel = useCallback((e) => {
      e.preventDefault();
      resetFields();
    }, [resetFields]);
  
    useEffect(() => {
      reduxDispatch(getProfile());
      setupFields();
      // eslint-disable-next-line
    }, []);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        reduxDispatch(updateProfile(name, password, email));
    }

    return (
        <div>
            <form onSubmit={onSubmit} className={styles.formContainer}>
                <Input type="text" placeholder="Имя" icon="EditIcon" onChange={onChangeName} value={name}/>
                <Input type="email" placeholder="e-mail" icon="EditIcon" onChange={onChangeEmail} value={email}/>
                <Input type="password" placeholder="Пароль" icon="EditIcon" onChange={onChangePassword} value={password}/>
                <span>
                  <Button type="secondary" size="medium" onClick={onCancel}>Отмена</Button>
                  <Button type="primary" size="medium">Сохранить</Button>
                </span>
            </form>
            <div>
                <p className="text text_color_inactive">В этом разделе вы можете изменить ваши персональные данные</p>
            </div> 
        </div>
    );
}

export default ProfileSettingsPage;