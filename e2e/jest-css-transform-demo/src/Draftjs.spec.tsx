import React from 'react';
import { Editor } from 'draft-js';
import 'draft-js/dist/Draft.css';

it('editor', () => expect(<Editor />).toBeDefined());
