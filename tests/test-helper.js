import Application from '../app'
import config from '../config/environment'
import {setApplication} from '@ember/test-helpers'
import resolver from './helpers/resolver'
import {setResolver} from 'ember-mocha'

setResolver(resolver)
setApplication(Application.create(config.APP))
