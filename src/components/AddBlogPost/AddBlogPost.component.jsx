import * as React from 'react';

// Third party libraries
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false], }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [
      { 'list': 'ordered', },
      { 'list': 'bullet', },
      { 'indent': '-1', },
      { 'indent': '+1', }
    ],
    ['link', 'image'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

export default class AddBlogPost extends React.Component {
  state = {
    showEditors: false,
    text: '',
  }

  _onToggleEditor = () => {
    this.setState({
      showEditors: !this.state.showEditors,
    });
  }

  _handleChange = (value) => {
    console.log(value, 'value');
    this.setState({ text: value, });
  };

  render () {
    const { showEditors, } = this.state;
    const toggle = showEditors ? `show` : `hide`;
    return (
      <div className="add-blog-container">
        <div className={`editor-wrapper ${toggle}`}>
          <span className={`toggle-btn ${toggle}`} onClick={this._onToggleEditor}>
            <i className={`fa ${showEditors ? `fa-times` : `fa-plus`}`} aria-hidden="true"></i>
          </span>
          <div className={`editor-container ${toggle}`}>
            <span className={`editor-btn editor-add-image ${toggle}`}>
              <i className="fa fa-camera" aria-hidden="true"></i>
            </span>
            <span className={`editor-btn editor-add-video} ${toggle}`}>
              <i className="fa fa-video-camera" aria-hidden="true"></i>
            </span>
            <span className={`editor-btn editor-add-code ${toggle}`}>
              <i className="fa fa-code" aria-hidden="true"></i>
            </span>
          </div>
        </div>

        <ReactQuill
          value={this.state.text}
          onChange={this._handleChange}
          modules={modules}
          formats={formats}
        />
      </div>
    );
  }
}
