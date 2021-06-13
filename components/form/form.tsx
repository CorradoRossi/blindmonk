import { useState } from 'react';
import cn from 'classnames';
import useHomeData from '@lib/hooks/use-home-data';
import { useRouter } from 'next/router';
import FormError from '@lib/form-error';
import LoadingDots from '../utils/loading-dots';
import styleUtils from 'styles/utils.module.css';
import styles from 'styles/form.module.css';
import useEmailQueryParam from '@lib/hooks/use-email-query-param';
import { register } from '@lib/user-api';
import { FormState, FormProps } from '@lib/types';

const Form = ({ sharePage }: FormProps) => {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorTryAgain, setErrorTryAgain] = useState(false);
  const [focused, setFocused] = useState(false);
  const [formState, setFormState] = useState<FormState>('default');
  const { setPageState, setUserData } = useHomeData();
  const router = useRouter();
  useEmailQueryParam('email', setEmail);

  return formState === 'error' ? (
    <div
      className={cn(styles.form, {
        [styles['share-page']]: sharePage
      })}
    >
      <div className={styles['form-row']}>
        <div className={cn(styles['input-label'], styles.error)}>
          <div className={cn(styles.input, styles['input-text'])}>{errorMsg}</div>
          <button
            type="button"
            className={cn(styles.submit, styles.register, styles.error)}
            onClick={() => {
              setFormState('default');
              setErrorTryAgain(true);
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  ) : (
    <form
      className={cn(styles.form, {
        [styles['share-page']]: sharePage,
        [styleUtils.appear]: !errorTryAgain,
        [styleUtils['appear-fifth']]: !errorTryAgain && !sharePage,
        [styleUtils['appear-third']]: !errorTryAgain && sharePage
      })}
      onSubmit={e => {
        if (formState === 'default') {
          setFormState('loading');
          register(email)
            .then(async res => {
              if (!res.ok) {
                throw new FormError(res);
              }

              const data = await res.json();
              const params = {
                id: data.id,
                ticketNumber: data.ticketNumber,
                name: data.name,
                username: data.username
              };

              if (sharePage) {
                const queryString = Object.keys(params)
                  .map(
                    key =>
                      `${encodeURIComponent(key)}=${encodeURIComponent(
                        params[key as keyof typeof params] || ''
                      )}`
                  )
                  .join('&');
                router.replace(`/?${queryString}`, '/');
              } else {
                setUserData(params);
                setPageState('ticket');
              }
            })
            .catch(async err => {
              let message = 'Error! Please try again.';

              if (err instanceof FormError) {
                const { res } = err;
                const data = res.headers.get('Content-Type')?.includes('application/json')
                  ? await res.json()
                  : null;

                if (data?.error?.code === 'bad_email') {
                  message = 'Please enter a valid email';
                }
              }

              setErrorMsg(message);
              setFormState('error');
            });
        } else {
          setFormState('default');
        }
        e.preventDefault();
      }}
    >
      <div className={styles['form-row']}>
        <label
          htmlFor="email-input-field"
          className={cn(styles['input-label'], {
            [styles.focused]: focused
          })}
        >
          <input
            className={styles.input}
            autoComplete="off"
            type="email"
            id="email-input-field"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Enter email to join beta waitlist"
            aria-label="Your email address"
            required
          />
        </label>
        <button
          type="submit"
          className={cn(styles.submit, styles.register, styles[formState])}
          disabled={formState === 'loading'}
        >
          {formState === 'loading' ? <LoadingDots size={4} /> : <>Enter</>}
        </button>
      </div>
    </form>
  );
};

export default Form;
