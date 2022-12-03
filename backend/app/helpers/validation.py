import re


def is_valid_pincode(str):
    regex = "^[1-9]{1}[0-9]{5}$"
    p = re.compile(regex)
    if not str:
        return False
    m = re.match(p, str)
    if m is None:
        return False
    else:
        return True


def is_upperalphanumeric_or_underscore(str):
    regex = "^[A-Z0-9_]*$"
    p = re.compile(regex)
    if not str:
        return False
    m = re.match(p, str)
    if m is None:
        return False
    else:
        return True


def is_upperalphanumeric(str):
    regex = "^[A-Z0-9]*$"
    p = re.compile(regex)
    if not str:
        return False
    m = re.match(p, str)
    if m is None:
        return False
    else:
        return True


def is_valid_phone_number(str):
    regex = "^[6789]\d{9}$"
    p = re.compile(regex)
    if not str:
        return False
    m = re.match(p, str)
    if m is None:
        return False
    else:
        return True


def is_valid_email_id(str):
    regex = "^[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]*$"
    p = re.compile(regex)
    if not str:
        return False
    m = re.match(p, str)
    if m is None:
        return False
    else:
        return True
