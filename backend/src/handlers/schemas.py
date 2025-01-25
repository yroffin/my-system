"""Schemas module"""
from marshmallow import Schema, fields, validate


class BaseSchema(Schema):
    class Meta:
        ordered = True


# RESPONSES
# =========


class BaseSuccessSchema(BaseSchema):
    success = fields.Boolean(
        required=True,
        description='This is always "True" when a request succeeds',
        example=True,
    )


class BaseErrorSchema(BaseSchema):
    success = fields.Boolean(
        required=True,
        description='This is always "False" when a request fails',
        example=False,
    )


class BadRequestSchema(BaseErrorSchema):
    errors = fields.Dict(
        required=False,
        description="Attached request body validation errors",
        example={"name": ["Missing data for required field."]},
    )
