import urllib


def urlify(in_string):
    in_string = in_string.strip()
    return urllib.parse.quote(in_string)
