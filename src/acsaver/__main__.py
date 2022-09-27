# coding=utf-8
import click
from acfunsdk import Acer
from utils import live_recorder

__author__ = 'dolacmeo'


@click.command()
@click.argument('cmd_name')
@click.option("--args", nargs=3)
def cli(cmd_name, args):
    if cmd_name == 'live_recorder':
        acer = Acer()
        live_obj = acer.get(args[0]).live
        return live_recorder(live_obj, *args[1:])
    return True


if __name__ == '__main__':
    cli()
