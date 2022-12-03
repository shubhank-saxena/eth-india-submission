import tweepy


def get_twitter_meta(auth_token):
    auth = tweepy.OAuthHandler('', '')
    auth.set_access_token('', '')
    api = tweepy.API(auth)
    user = api.verify_credentials()
    return user.screen_name
