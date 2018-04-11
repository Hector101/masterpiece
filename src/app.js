import * as React from 'react';
import { render } from 'react-dom';

import './scss/_custom.scss';

import Pages from './components/Pages/Pages.component';
// import AddBlogPost from './components/AddBlogPost/AddBlogPost.component';

render(<Pages />, document.getElementById('root'));
