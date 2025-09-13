use anchor_lang::prelude::*;

declare_id!("DmzXrTkrEZMubw5Sv1SjbR9bPJVp1qY2QKbLn31TE3JT");

#[program]
pub mod contract {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
