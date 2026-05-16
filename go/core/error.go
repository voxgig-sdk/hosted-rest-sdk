package core

type HostedRestError struct {
	IsHostedRestError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewHostedRestError(code string, msg string, ctx *Context) *HostedRestError {
	return &HostedRestError{
		IsHostedRestError: true,
		Sdk:              "HostedRest",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *HostedRestError) Error() string {
	return e.Msg
}
