import Content from '../../components/layout/Content';
import Button from '../../components/tools/Button';
import Textarea from '../../components/tools/Textarea';
import { useEffect, useRef, useState } from 'react';
import './newAdvertPage.css';
import { postAdvert } from '../../components/auth/service';
import { useNavigate } from 'react-router';
import FormField from '../../components/tools/FormField';

const MIN_CHARACTERS = 5;
const MAX_CHARACTERS = 300;

function NewAdvertPage() {
  const [content, setContent] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const counterRef = useRef(0);
  const formRef = useRef(null);
  const divRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    counterRef.current++;
  });

  const handleChange = event => {
    setContent(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setIsFetching(true);
      const advert = await postAdvert({ content });
      navigate(`../${advert.id}`, { relative: 'path' });
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      } else {
        setIsFetching(false);
      }
    }
  };

  const characters = `${content.length} / ${MAX_CHARACTERS}`;
  const buttonDisabled = content.length <= MIN_CHARACTERS || isFetching;

  return (
    <Content title="Post your item, now!">
      <div
        className="newTweetPage"
        ref={element => {
          divRef.current = element;
        }}
      >
        <div>
          <FormField
            type="text"
            name="email"
            label="Item's Name"
            className="loginForm-field5"
            onChange={handleChange}
          />
        </div>
        <div>
          <FormField
            type="number"
            name="Price"
            label="Price"
            className="loginForm-field5"
            onChange={handleChange}
          />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit} ref={formRef}>
            <Textarea
              className="newTweetPage-textarea"
              placeholder="Description"
              value={content}
              onChange={handleChange}
              maxLength={MAX_CHARACTERS}
              ref={textareaRef}
            />
            <div className="newTweetPage-footer">
              <span className="newTweetPage-characters">{characters}</span>
              <Button
                type="submit"
                className="newTweetPage-submit"
                $variant="primary"
                disabled={buttonDisabled}
              >
                Let's go!
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Content>
  );
}

export default NewAdvertPage;
