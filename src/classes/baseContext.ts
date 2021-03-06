import { ButtonInteraction, GuildMember, InteractionDeferReplyOptions, InteractionDeferUpdateOptions, InteractionReplyOptions, InteractionUpdateOptions, Message, MessageEmbed, PartialGroupDMChannel } from "discord.js";
import { OculusReferralClient } from "./client";
import pg from "pg"

export class BaseContext{
    client: OculusReferralClient
    sql: pg.Client
    constructor(client: OculusReferralClient, sql: pg.Client){
        this.client = client
        this.sql = sql
    }

    async log(message: string | MessageEmbed | MessageEmbed[]): Promise<Message | null> {
        let guild = await this.client.guilds.fetch(process.env["GUILD_ID"]!)
        return await guild.channels.fetch(process.env["LOG_CHANNEL_ID"]!).then(async c => {
            if(c?.isText()) {
                return await c.send(typeof message === "string" ? {content: message} : Array.isArray(message) ? {embeds: message} : {embeds: [message]})
            } 
            else return null
        })
    }
}