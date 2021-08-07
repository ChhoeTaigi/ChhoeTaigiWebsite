import './styles.scss';

if (Meteor.userId()) {
    import './manage.scss';
}